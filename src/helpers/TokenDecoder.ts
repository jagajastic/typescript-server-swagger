import { decode } from 'jwt-simple';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import response from './response';

export default (req: Request, _res: Response) => {
  try {
    // gt authorized token
    const authorization = req.headers['authorization'];

    // check if authorized token is empty, return Uathorized error
    if (!authorization) {
      return response({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Unauthorized user',
        payload: {},
      });
    }

    // split and get the token from the string
    let token = authorization.split(' ')[1];

    // send token and decoded user data
    return response({
      statusCode: httpStatus.OK,
      message: 'Unauthorized user ok',
      payload: decode(token, process.env.JWT_TOKEN_SECRET!),
    });
  } catch (error) {
    // return expired token error
    return response({
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Invalid Token',
      payload: error,
    });
  }
};
