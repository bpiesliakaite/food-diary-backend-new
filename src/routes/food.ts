import Router from 'express';
import { authenticateRequest } from '../controllers/auth/authController';
import { createMeal, createUserFoodMealRecordEntry, createUserFoodRecordEntry, deleteMeal, editMeal, getFoodByGroup, getMeals, getUserFoodRecordEntries } from '../controllers/food/foodController';
import { notAllowedHandler } from '../utils/route-handlers';

const router = Router();

router.get('/foodByGroup', getFoodByGroup);
router.all('/foodByGroup', notAllowedHandler);

router.get('/foodEntries', authenticateRequest, getUserFoodRecordEntries);
router.all('/foodEntries', notAllowedHandler);

router.post('/createFoodEntry', authenticateRequest, createUserFoodRecordEntry);
router.all('/createFoodEntry', notAllowedHandler);

router.post('/createMealEntry', authenticateRequest, createUserFoodMealRecordEntry);
router.all('/createMealEntry', notAllowedHandler);

// router.get('/meals', authenticateRequest, getMeals);
router.get('/meals', authenticateRequest, getMeals);
router.post('/meals', authenticateRequest, createMeal);
router.put('/meals/:id', authenticateRequest, editMeal);
router.delete('/meals/:id', authenticateRequest, deleteMeal);
// router.all('/meals', notAllowedHandler);

export default router;