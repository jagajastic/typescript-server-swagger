import PostModel from '../../src/models/post';

describe('Post Model', () => {
  test('can model new post data', () => {
    const postContent = {
      type: 'text',
      mediaURL: 'https://media-url',
      text: 'My new post',
    };

    const newRole = new PostModel(postContent);
    expect(newRole).toBeDefined();
    expect(newRole).toHaveProperty('type', postContent.type);
    expect(newRole).toHaveProperty('mediaURL', postContent.mediaURL);
    expect(newRole).toHaveProperty('text', postContent.text);
  });
});
