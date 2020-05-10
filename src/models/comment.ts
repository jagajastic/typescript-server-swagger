import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  contentId: string;
  mediaURL?: string;
  text?: string;
  likes?: string[];
  replies?: string[];
}

const CommentModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    mediaURL: { type: String },
    text: { type: String },
    likes: [{ type: String }],
    replies: [{ type: String }],
  },
  { timestamps: true },
);

const CommentModel = mongoose.model<IComment>('Comment', CommentModelSchema);

export default CommentModel;
