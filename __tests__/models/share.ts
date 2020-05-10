import ShareModel from '../../src/models/share';
import Mongoose from 'mongoose';

describe('Share Model', () => {
  test('can model new share data', () => {
    const shareInfo = {
      userId: '5e1a132d267e5e81776620fb',
      postId: '5e1a132d267e5e81776620fa',
      postType: 'timeline',
    };
    const newShare = new ShareModel(shareInfo);
    expect(newShare).toBeDefined();
    expect(newShare).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(shareInfo.userId),
    );
    expect(newShare).toHaveProperty(
      'postId',
      Mongoose.Types.ObjectId(shareInfo.postId),
    );
    expect(newShare).toHaveProperty('postType', shareInfo.postType);
  });
});
