import mongoose, { Schema, Document } from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';
import httpStatus from 'http-status';

export interface IUserNoExtend {
  email: string;
  firstName: String;
  lastName: String;
  DOB?: Date;
  phone?: String;
  password: String;
  country?: string;
  state?: string;
  zip?: string;
  address?: string;
  isDeleted?: boolean;
  roleId?: string[];
  isActive?: Boolean;
  isVerified?: Boolean;
}

export interface IUser extends Document {
  payload: any;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  password: string;
  phone?: string;
  DOB?: Date;
  country?: string;
  state?: string;
  zip?: string;
  address?: string;
  isDeleted?: boolean;
  roleId?: string[];
}

export interface ILogin {
  email: String;
  phone?: String;
  password: string;
}

const UserModelSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: { type: Date },
    phone: { type: String, unique: true, required: true },
    country: { type: String },
    state: { type: String },
    zip: { type: String },
    address: { type: String },
    roleId: [{ type: String }],
    token: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserModelSchema.pre<IUser>('save', async function(this: IUser, next) {
  const { email, phone } = this;
  const userwithEmailExist = await UserModel.findOne({ email });
  if (userwithEmailExist) {
    throw { code: httpStatus.CONFLICT, message: 'Email already Exist' };
  }
  const userWithPhoneExist = await UserModel.findOne({ phone });
  if (userWithPhoneExist) {
    throw { code: httpStatus.CONFLICT, message: 'Phone number already Exist' };
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await hash(this.password.toString(), salt);
  }

  next();
});

const UserModel = mongoose.model<IUser>('User', UserModelSchema);

export default UserModel;
