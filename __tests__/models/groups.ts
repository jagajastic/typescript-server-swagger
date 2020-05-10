import GroupModel from '../../src/models/group';
import Mongoose from 'mongoose';

describe('Group Model', () => {
  test('can model new Group data', () => {
    const groupData = {
      userId: '5e1a132d267e5e81776620fb',
      name: 'Programmers world',
      description:
        'A platform where people in the programming world comes to share ideas with their peers.',
      avatarURL: 'https://media-url',
      groupMembers: [Mongoose.Types.ObjectId('5e1a132d267e5e81776620ff')],
    };

    const newGroup = new GroupModel(groupData);
    const groupMembers = Array.from(newGroup.groupMembers);

    expect(newGroup).toBeDefined();
    expect(newGroup).toHaveProperty(
      'userId',
      Mongoose.Types.ObjectId(newGroup.userId),
    );
    expect(newGroup).toHaveProperty('name', groupData.name);
    expect(newGroup).toHaveProperty('description', groupData.description);
    expect(groupMembers).toEqual(groupData.groupMembers);
  });
});
