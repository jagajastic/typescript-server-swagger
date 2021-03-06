import mongoose, { Schema, Document } from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  DOB?: Date;
  country?: string;
  state?: string;
  zip?: string;
  address?: string;
  pages?: string[];
  groups?: string[];
  aboutMe?: string;
  isDeleted?: boolean;
  roleId?: string[];
}

export interface ILogin {
  email: String;
  phone?: String;
  password: string;
}

const AdminModelSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: { type: Date },
    phone: { type: String },
    country: { type: String },
    state: { type: String },
    zip: { type: String },
    address: { type: String },
    pages: [{ type: String }],
    groups: [{ type: String }],
    aboutMe: { type: String },
    roleId: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

AdminModelSchema.pre<IAdmin>('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await hash(this.password.toString(), salt);
  }
});

const AdminModel = mongoose.model<IAdmin>('Admin', AdminModelSchema);

export default AdminModel;
