import mongoose, { Schema, Document } from 'mongoose';

export interface IShare extends Document {
  userId: string;
  postId: string;
  postType: string;
}

const ShareModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    contentType: { type: String, required: true },
    postType: { type: String, required: true },
  },
  { timestamps: true },
);

const ShareModel = mongoose.model<IShare>('Share', ShareModelSchema);

export default ShareModel;
