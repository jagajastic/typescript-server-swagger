import { Request, Response, NextFunction } from 'express';
import TokenDecoder from '../helpers/TokenDecoder';
import { getUser } from './user';
import httpStatus from 'http-status';
import { IResponse } from '../helpers/response';
import response from '../helpers/response';

/**
 *
 * @param req // request object
 * @param res // response object
 * @param next // next function that call the next middleware
 * @function TokenDecoder // return { token, decodedToken }
 * @param decodedToken // { id, user }
 */
const authRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // destructure decodedToken out of TokenDecoder object
    const decodedToken: IResponse = TokenDecoder(req, res);

    // check if decodedToken is empty or null, return error
    if (decodedToken.statusCode === httpStatus.UNAUTHORIZED) {
      // send unauthorized error since user does not exist
      return res.status(httpStatus.UNAUTHORIZED).json(decodedToken);
    }

    // destructure id from decodedToken
    //@ts-ignore
    const { id } = decodedToken.payload;

    // get user from db by id
    console.log(decodedToken);
    const user = await getUser({ _id: id });

    // check if the user exist
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json(
        response({
          statusCode: httpStatus.NOT_FOUND,
          message: 'User deoes not exist',
          payload: {},
        }),
      );
    }
    // append id to req body
    req.body.id = id;

    //   append user to req body
    req.body.user = user;

    //   move to the next middleware,else hit the route controller
    return next();
  } catch (error) {
    //   move error to next middleware
    next(error);
  }
};

// export authRoute to authenticate route
export default authRoute;
