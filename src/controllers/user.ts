import { Request, Response } from 'express';
import { allUsers, getUser, saveUser, updateUserDetails } from '../API/user';
import response from '../helpers/response';
import httpStatus from 'http-status';
import { tokenEncoder } from '../helpers/tokenEncoder';
import messages from '../helpers/mailMessage';
import sendMail from '../helpers/sendMail';

// get all users
export const getAllUser = async (_req: Request, res: Response) => {
  const userData = await allUsers();
  return res.json(
    response({
      statusCode: httpStatus.OK,
      message: 'success',
      payload: userData,
    }),
  );
};

// get a user
export const getAUserByEmail = async (req: Request, res: Response) => {
  try {
    const userData = await getUser(req.params);
    if (!userData) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'user not found',
          payload: {},
        }),
      );
    }
    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'Success',
        payload: userData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw new Error(error);
  }
};

export const getAUserById = async (req: Request, res: Response) => {
  try {
    const userData = await getUser(req.params);
    if (!userData) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'user not found',
          payload: {},
        }),
      );
    }
    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'Success',
        payload: userData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw new Error(error);
  }
};

// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await saveUser(req.body);
    // send email after signup
    const subject =
      'Welcome to Fansunity! 👋 Please confirm your email address';
    const token = tokenEncoder(email, result._id, false);
    sendMail(email, messages.confirmationEmail(token), subject);
    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'Success',
        payload: result,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw new Error(error);
  }
};

// update a user
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    // check user by id if he/she exist
    const updatedUserData = await updateUserDetails({
      _id: req.params.id,
      body: req.body,
    });
    if (!updatedUserData) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'user not found',
          payload: {},
        }),
      );
    }
    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'account information updated',
        payload: updatedUserData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw new Error(error);
  }
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // check if user exist
    const deletedUserData = await updateUserDetails({
      _id: req.params.id,
      body: req.body,
    });

    if (!deletedUserData) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'user not found',
          payload: {},
        }),
      );
    }

    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'account deleted',
        payload: deletedUserData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw new Error(error);
  }
};
//
