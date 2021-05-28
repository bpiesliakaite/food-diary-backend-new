import { RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFoundError, getRepository } from 'typeorm';
import User from '../../entity/User';
import hashPassword from '../../utils/hashPassword';
import { AuthenticatedRequest } from '../auth/authController';

interface IUserResponse {
  email: string;
  createDate: Date;
}

export const getSelf: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response<IUserResponse>
) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(req.user.id);
    return res
      .status(StatusCodes.OK)
      .json(user);
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export const updateUser: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response<User>
) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail(req.user.id);

    const updatedUser = await userRepository.save({
      ...user,
      ...req.body
    });

    return res.status(StatusCodes.OK).json(updatedUser);

  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export const changePassword: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.createQueryBuilder('user')
      .where('user.id = :userId', { userId: req.user.id })
      .andWhere('user.password = :password', { password: hashPassword(req.body.currentPassword) })
      .getOneOrFail()
    ;

    const updatedUser = await userRepository.save({
      ...user,
      password: hashPassword(req.body.newPassword)
    });

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}