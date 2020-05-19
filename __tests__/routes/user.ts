import app from '../../src/app';
import request from 'supertest';
import userModel from '../../src/models/user';

describe('User Routes', () => {
  // clean up after testing everything
  afterAll(async () => {
    await userModel.deleteMany({});
  });

  test('create', async () => {
    const user = {
      firstName: 'fans',
      lastName: 'unity',
      email: 'fansunity@gmail.com',
      password: 'password',
    };
    return await request(app)
      .post('/api/user')
      .send(user)
      .then(resp => {
        let result = JSON.parse(resp.text).statusCode;
        expect(result).toBe(200);
      });
  });

  test('Get All users', () => {
    return request(app)
      .get('/api/user')
      .then(resp => {
        const len = JSON.parse(resp.text).payload.length;
        expect(len).toBe(1);
      });
  });

  test('Get user by email', () => {
    return request(app)
      .get('/api/user/email/fansunity@gmail.com')
      .then(resp => {
        const result = JSON.parse(resp.text).payload.email;
        expect(result).toBe('fansunity@gmail.com');
      });
  });

  test('Get by Id', async () => {
    const list = await request(app).get('/api/user');
    const id = JSON.parse(list.text).payload[0]._id;
    return request(app)
      .get(`/api/user/id/${id}`)
      .then(resp => {
        const userId = JSON.parse(resp.text).payload._id;
        expect(userId).toBe(id);
      });
  });

  test('Update user', async () => {
    const list = await request(app).get('/api/user');
    const id = JSON.parse(list.text).payload[0]._id;

    const newRecord = { firstName: 'John', lastName: 'Joe' };

    return request(app)
      .put(`/api/user/${id}`)
      .send(newRecord)
      .then(resp => {
        const result = JSON.parse(resp.text).payload;
        expect(result.firstName).toContain(newRecord.firstName);
        expect(result.lastName).toContain(newRecord.lastName);
      });
  });

  test('Delete user', async () => {
    const list = await request(app).get('/api/user');
    const id = JSON.parse(list.text).payload[0]._id;

    return request(app)
      .delete(`/api/user/${id}`)
      .then(resp => {
        const result = JSON.parse(resp.text).payload;
        expect(result.firstName).toContain('John');
        expect(result.lastName).toContain('Joe');
      });
  });
});
