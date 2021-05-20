import { RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
            userId: req.user.id
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
    const userFood = await userFoodRecordEntryRepository.createQueryBuilder('entry')
        .leftJoinAndSelect('entry.foodData', 'foodData')
        .leftJoinAndSelect('entry.userFoodRecord', 'userFoodRecord')
        .where('userFoodRecord.userId = :userId', { userId: req.user.id })
        .getMany();

    return res.status(StatusCodes.OK).json({
        userFood: userFood.map(entry => ({
            food: entry.foodData.food,
            group: entry.foodData.group,
            mealType: entry.userFoodRecord.mealType,
            amount: entry.amount,
        }))
    });

}

export const getMeals: RequestHandler = async (
    _: AuthenticatedRequest,
    res: Response,
) => {
    const mealRepository = getRepository(Meal);
    const meals = await mealRepository.find();
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