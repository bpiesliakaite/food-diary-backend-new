import { RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { startOfDay, endOfDay, format } from 'date-fns';
import { EntityNotFoundError, getRepository } from 'typeorm';
import Fooddata from '../../entity/Fooddata';
import Meal from '../../entity/Meal';
import UserFoodRecord from '../../entity/UserFoodRecord';
import UserFoodRecordEntry from '../../entity/UserFoodRecordEntry';
import UserMealRecordEntry from '../../entity/UserMealRecordEntry';
import { AuthenticatedRequest } from '../auth/authController';
import User from '../../entity/User';
import { Fooddatacomposition } from '../../entity/Fooddatacomposition';

interface IFoodsResponse {
    foods: Array<{
        food: string;
        id: number;
    }>
}

export const getFoodByGroup: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response<IFoodsResponse>
) => {
    const foodRepository = getRepository(Fooddata);
    const foods = await foodRepository.find({
        select: ['id', 'food'],
        where: {
            group: req.query.group
        }
    })
    return res.status(StatusCodes.OK).json({ foods });
}

export const createUserFoodMealRecordEntry: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const userFoodRecordRepository = getRepository(UserFoodRecord);
    let userFoodRecord = await userFoodRecordRepository.findOne({
        where: {
            mealType: req.body.mealType,
            userId: req.user.id,
        }
    });
    if (!userFoodRecord) {
        userFoodRecord = userFoodRecordRepository.create({
            mealType: req.body.mealType,
            userId: req.user.id,
            date: new Date(),
        });
        await userFoodRecordRepository.save(userFoodRecord);
    }
    const userFoodRecordEntryRepository = getRepository(UserFoodRecordEntry);
    const newUserFoodRecordEntry = userFoodRecordEntryRepository.create({
        amount: req.body.amount,
        userFoodRecord: userFoodRecord,
        userMealRecordId: req.body.meal,
    });
    await userFoodRecordEntryRepository.save(newUserFoodRecordEntry);

    const newFood = await userFoodRecordEntryRepository.findOne(newUserFoodRecordEntry.id, {
        relations: ['userMealRecord', 'userMealRecord.foodItems', 'userMealRecord.foodItems.foodData']
    });
    const result = await {
        meal: newFood.userMealRecord,
        mealType: userFoodRecord.mealType,
        amount: newFood.amount,
        foodComposition: await calculateFooddataComposition(newFood)
    };

    return res.status(StatusCodes.CREATED).json(result);
}

export const createUserFoodRecordEntry: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const userFoodRecordRepository = getRepository(UserFoodRecord);
    let userFoodRecord = await userFoodRecordRepository.findOne({
        where: {
            mealType: req.body.mealType,
            userId: req.user.id,
        }
    });
    if (!userFoodRecord) {
        userFoodRecord = userFoodRecordRepository.create({
            mealType: req.body.mealType,
            userId: req.user.id,
            date: new Date(),
        });
        await userFoodRecordRepository.save(userFoodRecord);
    }
    const userFoodRecordEntryRepository = getRepository(UserFoodRecordEntry);
    const newUserFoodRecordEntry = userFoodRecordEntryRepository.create({
        amount: req.body.amount,
        userFoodRecord,
        foodDataId: req.body.food,
    });
    await userFoodRecordEntryRepository.save(newUserFoodRecordEntry);

    const newFood = await userFoodRecordEntryRepository.findOne(newUserFoodRecordEntry.id, {
        relations: ['foodData', 'userFoodRecord']
    });

    const result = await {
        food: newFood.foodData.food,
        group: newFood.foodData.group,
        mealType: newFood.userFoodRecord.mealType,
        amount: newFood.amount,
        foodComposition: await calculateFooddataComposition(newFood)
    };

    return res.status(StatusCodes.CREATED).json(result);
}

interface FoodRecordEntryNutritions {
    KCALS: number;
    PROT: number;
    FAT: number;
    CHO: number;
    TOTSUG: number;
    VITC: number
    VITB6: number;
    K: number;
    CA: number;
    MG: number;
    FE: number;

}

export const getUserFoodRecordEntries: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const userFoodRecordEntryRepository = getRepository(UserFoodRecordEntry);
    const foodCompositionRepository = getRepository(Fooddatacomposition);
    const date = req.query.date as string;
    const userFood = await userFoodRecordEntryRepository.createQueryBuilder('entry')
        .leftJoinAndSelect('entry.foodData', 'foodData')
        .leftJoinAndSelect('entry.userFoodRecord', 'userFoodRecord')
        .withDeleted()
        .leftJoinAndSelect('entry.userMealRecord', 'userMealRecord')
        .leftJoinAndSelect('userMealRecord.foodItems', 'userMealRecordFoodItems')
        .leftJoinAndSelect('userMealRecordFoodItems.foodData', 'userMealRecordFoodItemsFooddata')
        .where('userFoodRecord.userId = :userId', { userId: req.user.id })
        .andWhere('entry.createDate >= :startDate', { startDate: startOfDay(new Date(date)).toISOString() })
        .andWhere('entry.createDate < :endDate', { endDate: endOfDay(new Date(date)).toISOString() })
        .getMany();

    const result = {
        userFood: await Promise.all(userFood.map(async (entry) => ({
            food: entry.foodData?.food,
            group: entry.foodData?.group,
            mealType: entry.userFoodRecord.mealType,
            amount: entry.amount,
            meal: entry.userMealRecord,
            foodComposition: await calculateFooddataComposition(entry)
        })))
    };
    return res.status(StatusCodes.OK).json(result);

}

const calculateFooddataComposition = async (entry: UserFoodRecordEntry | UserMealRecordEntry): Promise<FoodRecordEntryNutritions> => {
    const foodCompositionRepository = getRepository(Fooddatacomposition);

    if (entry instanceof UserFoodRecordEntry && entry.userMealRecord) {
        let totalFoodComposition: FoodRecordEntryNutritions = {
            KCALS: 0,
            PROT: 0,
            FAT: 0,
            CHO: 0,
            TOTSUG: 0,
            VITC: 0,
            VITB6: 0,
            K: 0,
            CA: 0,
            MG: 0,
            FE: 0,
        };

        for (let i = 0; i < entry.userMealRecord.foodItems.length; i++) {
            const foodDataComposition = await foodCompositionRepository
                .createQueryBuilder('food')
                .select([
                    'food.kcals', 'food.prot', 'food.fat', 'food.cho', 'food.totsug', 'food.vitc',
                    'food.vitb6', 'food.k', 'food.ca', 'food.mg', 'food.fe'
                ])
                .where('food.foodName LIKE :name', { name: `%${entry.userMealRecord.foodItems[i].foodData.food}%` })
                .getOne();

            totalFoodComposition = {
                KCALS: totalFoodComposition.KCALS + (entry.amount * ((parseFloat(foodDataComposition.kcals) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                PROT: totalFoodComposition.PROT + (entry.amount * ((parseFloat(foodDataComposition.prot) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                FAT: totalFoodComposition.FAT + (entry.amount * ((parseFloat(foodDataComposition.fat) / 100) || 0) * entry.userMealRecord.foodItems[i].amount),
                CHO: totalFoodComposition.CHO + (entry.amount * ((parseFloat(foodDataComposition.cho) / 100) || 0) * entry.userMealRecord.foodItems[i].amount),
                TOTSUG: totalFoodComposition.TOTSUG + (entry.amount * ((parseFloat(foodDataComposition.totsug) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                VITC: totalFoodComposition.VITC + (entry.amount * ((parseFloat(foodDataComposition.vitc) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                VITB6: totalFoodComposition.VITB6 + (entry.amount * ((parseFloat(foodDataComposition.vitb6) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                K: totalFoodComposition.K + (entry.amount * ((parseFloat(foodDataComposition.k) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                CA: totalFoodComposition.CA + (entry.amount * ((parseFloat(foodDataComposition.ca) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                MG: totalFoodComposition.MG + (entry.amount * ((parseFloat(foodDataComposition.mg) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
                FE: totalFoodComposition.FE + (entry.amount * ((parseFloat(foodDataComposition.fe) || 0) / 100) * entry.userMealRecord.foodItems[i].amount),
            };
        }
        return totalFoodComposition;

    } else if (entry.foodData) {
        const foodDataComposition = await foodCompositionRepository
            .createQueryBuilder('food')
            .select([
                'food.kcals', 'food.prot', 'food.fat', 'food.cho', 'food.totsug', 'food.vitc',
                'food.vitb6', 'food.k', 'food.ca', 'food.mg', 'food.fe'
            ])
            .where('food.foodName LIKE :name', { name: `%${entry.foodData.food}%` })
            .getOne();

        return {
            KCALS: ((parseFloat(foodDataComposition.kcals) || 0) / 100) * entry.amount,
            PROT: ((parseFloat(foodDataComposition.prot) || 0) / 100) * entry.amount,
            FAT: ((parseFloat(foodDataComposition.fat) || 0) / 100) * entry.amount,
            CHO: ((parseFloat(foodDataComposition.cho) || 0) / 100) * entry.amount,
            TOTSUG: ((parseFloat(foodDataComposition.totsug) || 0) / 100) * entry.amount,
            VITC: ((parseFloat(foodDataComposition.vitc) || 0) / 100) * entry.amount,
            VITB6: ((parseFloat(foodDataComposition.vitb6) || 0) / 100) * entry.amount,
            K: ((parseFloat(foodDataComposition.k) || 0) / 100) * entry.amount,
            CA: ((parseFloat(foodDataComposition.ca) || 0) / 100) * entry.amount,
            MG: ((parseFloat(foodDataComposition.mg) || 0) / 100) * entry.amount,
            FE: ((parseFloat(foodDataComposition.fe) || 0) / 100) * entry.amount,
        }
    }
}

export const getMeals: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const meals = await mealRepository
        .createQueryBuilder('m')
        .where('m.userId = :userId', { userId: req.user.id })
        .leftJoinAndSelect('m.foodItems', 'mealRecords')
        .leftJoinAndSelect('mealRecords.foodData', 'foodData')
        // .leftJoinAndSelect('mealRecord.foodDataId', 'fooddata')
        .getMany();

    const result = await Promise.all(meals.map(async (meal) => ({
        ...meal,
        foodItems: await Promise.all(meal.foodItems.map(async (foodItem) => ({
            ...foodItem,
            foodComposition: await calculateFooddataComposition(foodItem)
        })))
    })));

    return res.status(StatusCodes.OK).json({ meals: result });
}

export const createMeal: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const userMealRecordEntryRepository = getRepository(UserMealRecordEntry);
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOne({ id: req.user.id });
        const newMeal = mealRepository.create({
            name: req.body.name,
            info: req.body.info,
            user: user,
            foodItems: req.body.foodItems.map((foodItem) => userMealRecordEntryRepository.create({
                amount: foodItem.amount,
                foodDataId: foodItem.foodOption,
            })),
        });
        const meal = await mealRepository.save(newMeal);

        const refreshedMeal = await mealRepository.findOne(meal.id, {
            relations: ['foodItems', 'foodItems.foodData']
        });
        const result = {
            ...refreshedMeal,
            foodItems: await Promise.all(refreshedMeal.foodItems.map(async (foodItem) => ({
                ...foodItem,
                foodComposition: await calculateFooddataComposition(foodItem),
            })))
        }
        return res.status(StatusCodes.CREATED).json(result);
    } catch (exception) {
        console.log(exception);
    }
}

export const editMeal: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const userMealRecordEntryRepository = getRepository(UserMealRecordEntry);

    const id = parseInt(req.params.id);
    const meal = await mealRepository.findOne(id);
    try {
        const foodItems = await userMealRecordEntryRepository.find({ meal: meal });
        foodItems.map((foodItem) => {
            userMealRecordEntryRepository.remove(foodItem);
        })
        await mealRepository.save(
            {
                ...meal,
                ...{
                    name: req.body.name,
                    info: req.body.info,
                    ...(req.body.foodItems && {
                        foodItems: req.body.foodItems.map((foodItem) => userMealRecordEntryRepository.create({
                            amount: foodItem.amount,
                            foodDataId: foodItem.foodOption,
                        }))
                    }),
                }
            }


        );
        const updatedMeal = await mealRepository
            .createQueryBuilder('m')
            .where('m.id = :mealId', { mealId: id })
            .leftJoinAndSelect('m.foodItems', 'mealRecords')
            .leftJoinAndSelect('mealRecords.foodData', 'foodData')
            .getOne();

        const result = await {
            ...updatedMeal,
            foodItems: await Promise.all(updatedMeal.foodItems.map(async (foodItem) => ({
                ...foodItem,
                foodComposition: await calculateFooddataComposition(foodItem),
            })))
        }
        return res.status(StatusCodes.OK).json(result);
    } catch (exception) {
        console.log(exception);
    }
}

export const deleteMeal: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const id = req.params.id;
    try {
        const meal = await mealRepository.findOneOrFail({
            id: parseInt(req.params.id),
            userId: req.user.id
        });
        await mealRepository.softRemove(meal);
        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (exception) {
        if (exception instanceof EntityNotFoundError) {
            return res.status(StatusCodes.NOT_FOUND).send();
        }
        console.log(exception);
    }
}