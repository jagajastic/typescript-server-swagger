import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import httpStatus from 'http-status';
import { allUsers, getUser, saveUser, updateUserDetails } from '../API/user';
import response from '../helpers/response';
import messages from '../helpers/mailMessage';
import sendMail from '../helpers/sendMail';
import uuidTokenGenerator from '../helpers/uuidGen';

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
          message: 'User not found',
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
    throw error;
  }
};

export const getAUserById = async (req: Request, res: Response) => {
  try {
    const userData = await getUser(req.params);
    if (!userData) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'User not found',
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
    throw error;
  }
};

// create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    // get email
    const { email } = req.body;

    // create uuid token
    req.body.token = uuidTokenGenerator();
    const result = await saveUser(req.body);

    // send email after signup
    const subject =
      'Welcome to Fansunity! 👋 Please confirm your email address';
    const token = req.body.token;
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
    throw error;
  }
};

// update a user
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10);

    if (req.body.password) {
      req.body.password = await hash(req.body.password.toString(), salt);
    }

    // Try updating user information.
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
        message: 'Account information updated',
        payload: updatedUserData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw error;
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
          message: 'User not found',
          payload: {},
        }),
      );
    }

    return res.json(
      response({
        statusCode: httpStatus.OK,
        message: 'Account deleted',
        payload: deletedUserData,
      }),
    );
  } catch (error) {
    if (error.code) {
      return res.json(response({ ...error }));
    }
    throw error;
  }
};
//
