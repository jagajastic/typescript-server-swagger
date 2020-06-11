import AdminModel from '../../src/models/admin';

describe('Admin Model', () => {
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
    const newAdmin = new AdminModel(userInfo);
    expect(newAdmin).toBeDefined();
    expect(newAdmin).toHaveProperty('firstName', 'Fans');
    expect(newAdmin).toHaveProperty('lastName', 'Unity');
    expect(newAdmin).toHaveProperty('email', 'fans.unity@domain.com');
    expect(newAdmin).toHaveProperty('password', 'weakPassword');
    expect(newAdmin).toHaveProperty('phone', '09089213098');
    expect(newAdmin).toHaveProperty(
      'DOB',
      new Date('2015-07-06T11:08:27.000Z'),
    );
    expect(newAdmin).toHaveProperty('country', 'Nigeria');
    expect(newAdmin).toHaveProperty('state', 'Lagos');
    expect(newAdmin).toHaveProperty('zip', '100928');
    expect(newAdmin).toHaveProperty('address', 'Lekki');
    expect(newAdmin).toHaveProperty('aboutMe', 'little about me');
  });
});
