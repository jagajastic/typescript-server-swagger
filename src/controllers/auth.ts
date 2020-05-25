import { Request, Response } from 'express';
import httpStatus from 'http-status';
import decrypt from 'bcryptjs';
import { getUser, updateUserDetails } from '../API/user';
import response from '../helpers/response';
import { tokenEncoder } from '../helpers/tokenEncoder';
import sendMail from '../helpers/sendMail';
import message from '../helpers/mailMessage';

/**
 *
 * @param req
 * @param res
 */
export const login = async (req: Request, res: Response) => {
  try {
    // get user email
    const email = req.body.email;

    // get user by email
    const userDocument: any = await getUser({ email });

    // chec if user exist, else return not found error
    if (!userDocument) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'User not found',
          payload: {},
        }),
      );
    }

    // compare decrypted password and user request password
    const isValid = await decrypt.compare(
      req.body.password,
      userDocument.password,
    );

    // check if the password match, else throw email & password incorrect error
    if (!isValid) {
      return res.status(httpStatus.BAD_REQUEST).json(
        response({
          statusCode: httpStatus.BAD_REQUEST,
          message: 'Email or Password is incorrect',
          payload: {},
        }),
      );
    }

    // set user active since is logged in
    //@ts-ignore
    const loggedIn = await updateUserDetails({
      _id: userDocument._id,
      body: { isActive: true },
    });

    // generate token
    //@ts-ignore
    const authToken = tokenEncoder(email, userDocument._id, loggedIn.isActive);

    // send success response
    return res.status(httpStatus.OK).json(
      response({
        statusCode: httpStatus.OK,
        message: 'Login Successful',
        payload: userDocument,
        token: authToken,
      }),
    );
  } catch (error) {
    //   check if user model throw error
    if (error.code) {
      return res.json(response({ ...error }));
    }

    // throw error
    throw error;
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    // get verification token
    const { token } = req.body;

    // get user by token
    const isValidUserToken = await getUser({ token });
    // if not found, send invalid token error;
    if (!isValidUserToken) {
      return res.status(httpStatus.UNAUTHORIZED).json(
        response({
          statusCode: httpStatus.UNAUTHORIZED,
          message: 'Invalid Token',
          payload: {},
        }),
      );
    }

    // update the
    const activateUser = await updateUserDetails({
      _id: isValidUserToken._id,
      body: req.body,
    });

    // send verified success message
    if (!activateUser) {
      return res.status(httpStatus.BAD_REQUEST).json(
        response({
          statusCode: httpStatus.BAD_REQUEST,
          message: 'Bad request',
          payload: {},
        }),
      );
    }

    return res.status(httpStatus.OK).json(
      response({
        statusCode: httpStatus.OK,
        message: 'Verification success',
        payload: {},
      }),
    );
  } catch (error) {
    if (error.code) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response({ ...error }));
    }

    throw error;
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // get user by email
    const userCollection = await getUser({ email });

    // if not found, send user not found error
    if (!userCollection) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'User not found',
          payload: {},
        }),
      );
    }

    // send user verifiction token
    const subject =
      'Welcome to Fansunity! 👋 Please confirm your email address';
    const { token } = userCollection;
    sendMail(email, message.confirmationEmail(token), subject);

    return res.status(httpStatus.OK).json(
      response({
        statusCode: httpStatus.OK,
        message: 'Check your email to verify your account',
        payload: {},
      }),
    );
  } catch (error) {
    if (error.code) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(response({ ...error }));
    }

    throw error;
  }
};

/**
 *
 * @param req
 * @param res
 * @function getUser() // recieve {}, return user {}
 * @function tokenEncoder() // takes email, id, isVerified and return encoded token
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    //   get user email
    const { email } = req.body;

    // get user by email
    const userObject = await getUser({ email });

    // check if the user exist, else throw not found error
    if (!userObject) {
      return res.json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'Email does not exist :(',
          payload: {},
        }),
      );
    }

    // send email with reset rest link
    // generate token
    //@ts-ignore
    const token = tokenEncoder(email, userObject._id, userObject.isVerified!);
    const subject = 'Reset Password! 👋';

    // send email containing reset link
    sendMail(email, message.forgotPassword(token), subject);

    // return response object
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: 'Check your email for reset link!',
      payload: {},
    });
  } catch (error) {
    // return the error throw pre hook error from the user schema
    if (error.code) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(response({ ...error }));
    }

    // throw the error caught from the try block
    throw error;
  }
};

/**
 *
 * @param req
 * @param res
 */
export const resetPaassword = async (req: Request, res: Response) => {
  try {
    // get user information from request body
    const userData = req.body;

    // get user by email
    const userDocument: any = await getUser({ email: userData.email });

    // check if user exist, else return not found error
    if (!userDocument) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'User not found!',
          payload: {},
        }),
      );
    }

    // compare password for match
    const isTheSame = userData.password === userData.confirmPassword;
    if (!isTheSame) {
      // return password mismatch error
      return res.status(httpStatus.CONFLICT).json(
        response({
          statusCode: httpStatus.CONFLICT,
          message: 'Password mismatch!',
          payload: {},
        }),
      );
    }

    // update user password
    const updatePassword = updateUserDetails({
      _id: userDocument._id,
      body: { password: userDocument.password },
    });

    // send password updated response
    return res.status(httpStatus.OK).json(
      response({
        statusCode: httpStatus.OK,
        message: 'Password update, please proceed to login!',
        payload: { data: !updatePassword },
      }),
    );
  } catch (error) {
    //   check for error from user model pre hooks
    if (error.code) {
      return res.json(response({ ...error }));
    }

    // return caught error from try block
    throw error;
  }
};
