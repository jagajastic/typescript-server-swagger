import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  userId: string;
  type: string;
  mediaURL?: string;
  text: string;
  isSharable: boolean;
  likes: string[];
  comments: string[];
}

const PostModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    mediaURL: { type: String },
    text: { type: String, required: true },
    isSharable: { type: Boolean, required: true, default: true },
    likes: [{ type: String, required: true }],
    comments: [{ type: String, required: true }],
  },
  { timestamps: true },
);

const PostModel = mongoose.model<IPost>('Post', PostModelSchema);

export default PostModel;
