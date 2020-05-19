import {
  allUsers,
  //   getUser,
  saveUser,
  //   updateUserDetails,
} from '../../src/API/user';
import { IUserNoExtend } from '../../src/models/user';

const userData: IUserNoExtend = {
  firstName: 'fans',
  lastName: 'unity',
  email: 'fansunity@gmail.com',
  password: 'password',
};
describe('User API', () => {
  beforeEach(() => {});

  test('SaveUser', () => {
    const createdUser = saveUser(userData);

    createdUser.then(resp => {
      expect(resp).toContain({ firstName: 'fans' });
      expect(resp).toContain({ lastName: 'unity' });
      expect(resp).toContain({ email: 'fansunity@gmail.com' });
    });
  });

  test('Get All users', () => {
    const users = allUsers();
    users.then(resp => {
      let len = resp.length;
      expect(len).toBeTruthy();
    });
  });

  test('Get a user', () => {
    // const id = getUser('fansunity@gmail.com');
    // id.then((resp: IUser | null) => {
    //   expect(resp.email).toContain({
    //     email: 'fansunity@gmail.comuuu',
    //   });
    // });
  });
});
