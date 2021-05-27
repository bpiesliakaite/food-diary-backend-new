import { Router } from 'express';
import { authenticateRequest } from '../controllers/auth/authController';
import { changePassword, getSelf, updateUser } from '../controllers/user/userController';
import { notAllowedHandler } from '../utils/route-handlers';

const router = Router();

router.get('/self', authenticateRequest, getSelf);
router.all('/self', notAllowedHandler);

router.post('/update', authenticateRequest, updateUser);
router.all('/update', notAllowedHandler);
router.post('/change-password', authenticateRequest, changePassword);
router.all('/change-password', notAllowedHandler);

export default router;
