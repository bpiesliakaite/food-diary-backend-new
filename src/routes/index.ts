import { Router } from 'express';
import { notAllowedHandler, notFoundHandler } from '../utils/route-handlers';
import authRouter from './auth';
import userRouter from './user';
import foodRouter from './food';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).send('Hello world!');
});
router.all('/', notAllowedHandler);

router.use('/auth', authRouter);

router.use('/user', userRouter);

router.use('/food', foodRouter);

router.use(notFoundHandler);

export default router;
