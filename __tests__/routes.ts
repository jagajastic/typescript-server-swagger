import request from 'supertest';

import app from '../src/app';

describe('Server', () => {
  test('Has a /api/v1 endpoint', () => {
    return request(app)
      .get('/api/v1')
      .expect('Content-Type', /json/)
      .expect(200, { message: { hello: 'Hello World fansunity' } });
  });
});
