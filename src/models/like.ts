import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  userId: string;
  contentId: string;
  contentType: string;
  type: string;
}

const LikeModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contentType: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true },
);

const LikeModel = mongoose.model<ILike>('Like', LikeModelSchema);

export default LikeModel;
