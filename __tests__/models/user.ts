import UserModel from '../../src/models/user';

describe('User Model', () => {
  test('can model new user data', () => {
    const userInfo = {
      firstName: 'Fans',
      lastName: 'Unity',
      email: 'fans.unity@domain.com',
      password: 'weakPassword',
      phone: '09089213098',
      DOB: new Date('2015-07-06T11:08:27.000Z'),
      country: 'Nigeria',
      state: 'Lagos',
      zip: '100928',
      address: 'Lekki',
      aboutMe: 'little about me',
    };
    const newUser = new UserModel(userInfo);
    expect(newUser).toBeDefined();
    expect(newUser).toHaveProperty('firstName', 'Fans');
    expect(newUser).toHaveProperty('lastName', 'Unity');
    expect(newUser).toHaveProperty('email', 'fans.unity@domain.com');
    expect(newUser).toHaveProperty('password', 'weakPassword');
    expect(newUser).toHaveProperty('phone', '09089213098');
    expect(newUser).toHaveProperty('DOB', new Date('2015-07-06T11:08:27.000Z'));
    expect(newUser).toHaveProperty('country', 'Nigeria');
    expect(newUser).toHaveProperty('state', 'Lagos');
    expect(newUser).toHaveProperty('zip', '100928');
    expect(newUser).toHaveProperty('address', 'Lekki');
    expect(newUser).toHaveProperty('aboutMe', 'little about me');
  });
});
