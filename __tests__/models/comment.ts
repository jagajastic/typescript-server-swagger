import CommentModel from '../../src/models/comment';
import Mongoose from 'mongoose';

describe('Comment Model', () => {
  test('can model new comment data', () => {
    const commentInfo = {
      userId: '5e1a132d267e5e81776620fb',
      contentId: '5e1a132d267e5e81776620fa',
      mediaURL: 'https://www.mediaurl.com',
      text: 'My comment for this content',
    };
    const newComment = new CommentModel(commentInfo);
    expect(newComment).toBeDefined();
    expect(newComment).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(commentInfo.userId),
    );
    expect(newComment).toHaveProperty(
      'contentId',
      Mongoose.Types.ObjectId(commentInfo.contentId),
    );
    expect(newComment).toHaveProperty('mediaURL', commentInfo.mediaURL);
    expect(newComment).toHaveProperty('text', commentInfo.text);
  });
});
