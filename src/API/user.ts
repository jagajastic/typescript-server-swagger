import User, { IUserNoExtend } from '../models/user';
import { IUser } from '../models/user';

// get all users
export const allUsers = async () => User.find({ isDeleted: false });

// get user by a define params
export async function getUser<T>(arg: T): Promise<IUser | null> {
  return User.findOne(arg);
}

// save user data
export const saveUser = async (data: IUserNoExtend) => {
  const userData = new User(data);
  const savedUser = userData.save();
  return savedUser;
};

// update user details
export const updateUserDetails = async (data: {
  _id: string;
  body: object;
}) => {
  const updatedUserData = User.findOneAndUpdate(
    { _id: data._id },
    { $set: data.body },
    { new: true },
  );

  return updatedUserData;
};
