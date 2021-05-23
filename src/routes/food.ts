import Router from 'express';
import { authenticateRequest } from '../controllers/auth/authController';
import { createMeal, createUserFoodRecordEntry, deleteMeal, editMeal, getFoodByGroup, getMeals, getUserFoodRecordEntries } from '../controllers/food/foodController';
import { notAllowedHandler } from '../utils/route-handlers';

const router = Router();

router.get('/foodByGroup', getFoodByGroup);
router.all('/foodByGroup', notAllowedHandler);

router.get('/foodEntries', authenticateRequest, getUserFoodRecordEntries);
router.all('/foodEntries', notAllowedHandler);

router.post('/createFoodEntry', authenticateRequest, createUserFoodRecordEntry);
router.all('/createFoodEntry', notAllowedHandler);

// router.get('/meals', authenticateRequest, getMeals);
router.get('/meals', getMeals);
router.post('/meals', createMeal);
router.put('/meals/:id', editMeal);
router.delete('/meals/:id', deleteMeal);
// router.all('/meals', notAllowedHandler);

export default router;