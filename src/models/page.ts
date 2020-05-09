import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  userId: string;
  name: string;
  description: string;
  avatarURL: string;
  followers: string[];
}

const PageModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    avatarURL: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true },
);

const GroupModel = mongoose.model<IPage>('Group', PageModelSchema);

export default GroupModel;
