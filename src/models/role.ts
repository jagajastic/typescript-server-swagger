import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description: string;
  abbreviation: string;
  roleId: number;
  actions: string[];
}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    abbreviation: { type: String, required: true },
    roleId: { type: Number, required: true },
    actions: [{ type: String, required: true }],
  },
  { timestamps: true },
);

const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export default RoleModel;
