import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  userId: string;
  recipientId: string;
  mediaURL?: string;
  content?: string;
  status: boolean;
}

const ChatModelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mediaURL: { type: String },
    content: { type: String },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ChatModel = mongoose.model<IChat>('Chat', ChatModelSchema);

export default ChatModel;