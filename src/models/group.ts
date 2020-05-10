import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
  userId: string;
  name: string;
  description: string;
  avatarURL: string;
  groupMembers: string[];
}

const GroupModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    avatarURL: { type: String, required: true },
    groupMembers: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  },
  { timestamps: true },
);

const GroupModel = mongoose.model<IGroup>('Group', GroupModelSchema);

export default GroupModel;
