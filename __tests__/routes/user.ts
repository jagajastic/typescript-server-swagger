import mongoose from 'mongoose';
import app from '../../src/app';
import request from 'supertest';
import userModel from '../../src/models/user';
// import { saveUser } from '../../src/API/user';

describe('User Routes', () => {
  // clean up after testing everything
  afterAll(async () => {
    await userModel.deleteMany({});
  });

  describe('Create(POST) user', () => {
    test('create with correct data', () => {
      const user = {
        firstName: 'fans',
        lastName: 'unity',
        email: 'ibrexbase@gmail.com',
        password: 'password',
        phone: '09876543211234',
      };
      return request(app)
        .post('/api/v1/user')
        .send(user)
        .then(resp => {
          let result = JSON.parse(resp.text).statusCode;
          let message = JSON.parse(resp.text).message;
          let email = JSON.parse(resp.text).payload.email;
          let phone = JSON.parse(resp.text).payload.phone;
          let firstName = JSON.parse(resp.text).payload.firstName;
          let lastName = JSON.parse(resp.text).payload.lastName;
          expect(result).toBe(200);
          expect(message).toBeTruthy();
          expect(user.email).toBe(email);
          expect(user.phone).toBe(phone);
          expect(user.firstName).toBe(firstName);
          expect(user.lastName).toBe(lastName);
        });
    }, 50000);
    test('create with existing email', () => {
      const user = {
        firstName: 'fans',
        lastName: 'unity',
        email: 'ibrexbase@gmail.com',
        password: 'password',
        phone: '09876543211234',
      };
      return request(app)
        .post('/api/v1/user')
        .send(user)
        .then(resp => {
          let code = JSON.parse(resp.text).code;
          let message = JSON.parse(resp.text).message;
          expect(code).toBe(409);
          expect(message).toBeTruthy();
        });
    }, 50000);
    test('create with existing phone number', () => {
      const user = {
        firstName: 'fans',
        lastName: 'unity',
        email: 'tryme@gmail.com',
        password: 'password',
        phone: '09876543211234',
      };
      return request(app)
        .post('/api/v1/user')
        .send(user)
        .then(resp => {
          let code = JSON.parse(resp.text).code;
          let message = JSON.parse(resp.text).message;
          expect(code).toBe(409);
          expect(message).toBeTruthy();
        });
    }, 50000);
  });

  let loggedToken: string = '';
  let globalUserId: string = '';
  describe('Get(GET) user', () => {
    beforeAll(async () => {
      const user = {
        email: 'ibrexbase@gmail.com',
        password: 'password',
      };

      await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .then(res => {
          loggedToken = JSON.parse(res.text).token;
          globalUserId = JSON.parse(res.text).payload._id;
        });
    });
    test('Get All users', () => {
      return request(app)
        .get('/api/v1/user')
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const len = JSON.parse(resp.text).payload.length;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(len).toBe(1);
          expect(statusCode).toBe(200);
        });
    }, 50000);
    test('Get user by existing email', () => {
      const email = 'ibrexbase@gmail.com';
      return request(app)
        .get(`/api/v1/user/email/${email}`)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const findEmail = JSON.parse(resp.text).payload.email;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(findEmail).toBe(email);
          expect(statusCode).toBe(200);
        });
    }, 50000);
    test('Get user by non existing email', () => {
      const email = 'donootexist@gmail.com';
      return request(app)
        .get(`/api/v1/user/email/${email}`)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const message = JSON.parse(resp.text).message;
          const code = JSON.parse(resp.text).statusCode;
          expect(message).toBeTruthy();
          expect(code).toBe(404);
        });
    }, 50000);

    test('Get by existing Id', () => {
      const _id = globalUserId;
      return request(app)
        .get(`/api/v1/user/id/${_id}`)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const userId = JSON.parse(resp.text).payload._id;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(userId).toBe(_id);
          expect(statusCode).toBe(200);
        });
    }, 50000);
    test('Get by non existing Id', () => {
      const _id = new mongoose.Types.ObjectId();

      return request(app)
        .get(`/api/v1/user/id/${_id}`)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const message = JSON.parse(resp.text).message;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(message).toBeTruthy();
          expect(statusCode).toBe(404);
        });
    }, 50000);
  });

  describe('Update(PUT) user details', () => {
    test('Update user with correct id', () => {
      let _id = globalUserId;
      const newRecord = { firstName: 'Jaah', lastName: 'Jaha' };
      return request(app)
        .put(`/api/v1/user/${_id}`)
        .send(newRecord)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const result = JSON.parse(resp.text).payload;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(result.firstName).toContain(newRecord.firstName);
          expect(result.lastName).toContain(newRecord.lastName);
          expect(statusCode).toBe(200);
        });
    }, 50000);
    test('Update user with wrong id', () => {
      let _id = new mongoose.Types.ObjectId();
      const newRecord = { firstName: 'Jaah', lastName: 'Jaha' };
      return request(app)
        .put(`/api/v1/user/${_id}`)
        .send(newRecord)
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const message = JSON.parse(resp.text).message;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(message).toBeTruthy();
          expect(statusCode).toBe(404);
        });
    }, 50000);
  });

  describe('Delete(DELETE) user', () => {
    test('Delete user with correct id', async () => {
      const id = globalUserId;
      return request(app)
        .delete(`/api/v1/user/${id}`)
        .send({ isDeleted: true })
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const result = JSON.parse(resp.text).payload;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(result.isDeleted).toBeTruthy();
          expect(statusCode).toBe(200);
        });
    });
    test('Delete user with wrong id', async () => {
      const id = new mongoose.Types.ObjectId();
      return request(app)
        .delete(`/api/v1/user/${id}`)
        .send({ isDeleted: true })
        .set('Authorization', `Basic ${loggedToken}`)
        .then(resp => {
          const message = JSON.parse(resp.text).message;
          const statusCode = JSON.parse(resp.text).statusCode;
          expect(message).toBeTruthy();
          expect(statusCode).toBe(404);
        });
    });
  });
});
