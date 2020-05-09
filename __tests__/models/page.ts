import PageModel from '../../src/models/page';
import Mongoose from 'mongoose';

describe('Group Model', () => {
  test('can model new Group data', () => {
    const groupData = {
      userId: '5e1a132d267e5e81776620fb',
      name: 'Common wealth group of friends',
      description:
        'A platform where people in the programming world comes to share ideas with their peers.',
      avatarURL: 'https://media-url',
      followers: [Mongoose.Types.ObjectId('5e1a132d267e5e81776620ff')],
    };

    const newPage = new PageModel(groupData);
    const followers = Array.from(newPage.followers);

    expect(newPage).toBeDefined();
    expect(newPage).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(newPage.userId),
    );
    expect(newPage).toHaveProperty('name', groupData.name);
    expect(newPage).toHaveProperty('description', groupData.description);
    expect(followers).toEqual(groupData.followers);
  });
});
