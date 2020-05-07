import LikeModel from '../../src/models/like';
import Mongoose from 'mongoose';

describe('Like Model', () => {
  test('can model new like data', () => {
    const likeInfo = {
      userId: '5e1a132d267e5e81776620fb',
      contentId: '5e1a132d267e5e81776620fa',
      contentType: 'POST',
      type: 'LOVE',
    };
    const newChat = new LikeModel(likeInfo);
    expect(newChat).toBeDefined();
    expect(newChat).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(likeInfo.userId),
    );
    expect(newChat).toHaveProperty(
      'contentId',
      Mongoose.Types.ObjectId(likeInfo.contentId),
    );
    expect(newChat).toHaveProperty('contentType', likeInfo.contentType);
    expect(newChat).toHaveProperty('type', likeInfo.type);
  });
});
