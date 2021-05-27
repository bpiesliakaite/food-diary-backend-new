import { RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { startOfDay, endOfDay, format } from 'date-fns';
import { getRepository } from 'typeorm';
import Fooddata from '../../entity/Fooddata';
import Meal from '../../entity/Meal';
import UserFoodRecord from '../../entity/UserFoodRecord';
import UserFoodRecordEntry from '../../entity/UserFoodRecordEntry';
import UserMealRecordEntry from '../../entity/UserMealRecordEntry';
import { AuthenticatedRequest } from '../auth/authController';

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
        relations: ['userMealRecord']
    });

    return res.status(StatusCodes.CREATED).json({
        meal: newFood.userMealRecord,
        mealType: userFoodRecord.mealType,
        amount: newFood.amount
    });
}

export const createUserFoodRecordEntry: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
        console.log(req.body);
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

    return res.status(StatusCodes.CREATED).json({
        food: newFood.foodData.food,
        group: newFood.foodData.group,
        mealType: newFood.userFoodRecord.mealType,
        amount: newFood.amount
    });
}

export const getUserFoodRecordEntries: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const userFoodRecordEntryRepository = getRepository(UserFoodRecordEntry);
    const date = req.query.date as string;
    const userFood = await userFoodRecordEntryRepository.createQueryBuilder('entry')
        .leftJoinAndSelect('entry.foodData', 'foodData')
        .leftJoinAndSelect('entry.userFoodRecord', 'userFoodRecord')
        .leftJoinAndSelect('entry.userMealRecord', 'userMealRecord')
        .where('userFoodRecord.userId = :userId', { userId: req.user.id })
        .andWhere('entry.createDate >= :startDate', { startDate: startOfDay(new Date(date)).toISOString()})
        .andWhere('entry.createDate < :endDate', { endDate: endOfDay(new Date(date)).toISOString()})
        .getMany();

    return res.status(StatusCodes.OK).json({
        userFood: userFood.map(entry => ({
            food: entry.foodData?.food,
            group: entry.foodData?.group,
            mealType: entry.userFoodRecord.mealType,
            amount: entry.amount,
            meal: entry.userMealRecord
        }))
    });

}

export const getMeals: RequestHandler = async (
    _: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const meals = await mealRepository
    .createQueryBuilder('m')
    .leftJoinAndSelect('m.foodItems', 'mealRecords')
    .leftJoinAndSelect('mealRecords.foodData', 'foodData')
    // .leftJoinAndSelect('mealRecord.foodDataId', 'fooddata')
    .getMany();
    return res.status(StatusCodes.OK).json({ meals });
}

export const createMeal: RequestHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const userMealRecordEntryRepository = getRepository(UserMealRecordEntry);
    const newMeal = mealRepository.create({
        name: req.body.name,
        info: req.body.info,
        foodItems: req.body.foodItems.map((foodItem) => userMealRecordEntryRepository.create({
            amount: foodItem.amount,
            foodDataId: foodItem.foodOption,
        })),
    });
    try {
        const meal = await mealRepository.save(newMeal);
        return res.status(StatusCodes.CREATED).json(meal);
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
        const foodItems = await userMealRecordEntryRepository.find({meal: meal});
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
        return res.status(StatusCodes.OK).json(updatedMeal);
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
        const updatedMeal = await mealRepository.softDelete(id);
        return res.status(StatusCodes.CREATED).json(updatedMeal);
    } catch (exception) {
        console.log(exception);
    }
}