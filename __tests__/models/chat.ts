import ChatModel from '../../src/models/chat';
import Mongoose from 'mongoose';

describe('Chat Model', () => {
  test('can model new chat data', () => {
    const chatInfo = {
      userId: '5e1a132d267e5e81776620fb',
      recipientId: '5e1a132d267e5e81776620fa',
      mediaURL: 'https://www.mediaurl.com',
      content: 'How are you doing today?',
    };
    const newChat = new ChatModel(chatInfo);
    expect(newChat).toBeDefined();
    expect(newChat).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(chatInfo.userId),
    );
    expect(newChat).toHaveProperty(
      'recipientId',
      Mongoose.Types.ObjectId(chatInfo.recipientId),
    );
    expect(newChat).toHaveProperty('mediaURL', chatInfo.mediaURL);
    expect(newChat).toHaveProperty('content', chatInfo.content);
  });
});
