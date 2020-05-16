import { Request, Response } from 'express';
import { allUsers, getUser, saveUser, updateUserDetails } from '../API/user';
import response from '../helpers/response';
import { IUser } from '../models/user';
import httpStatus from 'http-status';
import { tokenEncoder } from '../helpers/tokenEncoder';
import messages from '../helpers/mailMessage';
import sendMail from '../helpers/sendMail';

// get all users
export const getAlluser = async (_req: Request, res: Response) => {
  const userDatas = await allUsers();
  return res.json(response(httpStatus.OK, 'success', userDatas, ''));
};

// get a user
export const getAUserByEmail = async (req: Request, res: Response) => {
  try {
    const userData: IUser | null = await getUser(req.params);
    if (!userData) {
      return res.json(
        response(httpStatus.NOT_FOUND, 'user not found', {}, null, ''),
      );
    }
    return res.json(
      response(httpStatus.OK, 'Success', userData || {}, null, ''),
    );
  } catch (error) {
    throw new Error(error);
  }
};
export const getAUserById = async (req: Request, res: Response) => {
  try {
    const userData: IUser | null = await getUser(req.params);
    if (!userData) {
      return res.json(
        response(httpStatus.NOT_FOUND, 'user not found', {}, null, ''),
      );
    }
    return res.json(
      response(httpStatus.OK, 'Success', userData || {}, null, ''),
    );
  } catch (error) {
    throw new Error(error);
  }
};

// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // check if email exist
    const isExist = await getUser({ email });
    if (!isExist) {
      const result = await saveUser(req.body);
      // send email after signup
      const subject =
        'Welcome to Fansunity! 👋 Please confirm your email address';
      const token = tokenEncoder(email, result._id, false);
      await sendMail(email, messages.confirmationEmail(token), subject);

      return res.json(
        response(httpStatus.OK, 'Success', result || {}, null, ''),
      );
    }

    return res.json(
      response(httpStatus.CONFLICT, 'Email Already Exist', {}, null, ''),
    );
  } catch (error) {
    throw new Error(error);
  }
};

// update a user
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    // check user by id if he/she exist
    const isExist = getUser({ _id: req.params.id });
    if (isExist) {
      const updatedUserData = await updateUserDetails({
        _id: req.params.id,
        body: req.body,
      });

      return res.json(
        response(
          httpStatus.OK,
          'account information updated',
          updatedUserData || {},
          '',
        ),
      );
    }

    return res.json(
      response(httpStatus.NOT_FOUND, 'user not found', {}, null, ''),
    );
  } catch (error) {
    throw new Error(error);
  }
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // check if user exist
    const isExist = getUser({ _id: req.params._id });
    if (isExist) {
      const updatedUserData = await updateUserDetails({
        _id: req.params.id,
        body: req.body,
      });

      return res.json(
        response(httpStatus.OK, 'account deleted', updatedUserData || {}, ''),
      );
    }

    return res.json(
      response(httpStatus.NOT_FOUND, 'user not found', {}, null, ''),
    );
  } catch (error) {
    throw new Error(error);
  }
};
//
