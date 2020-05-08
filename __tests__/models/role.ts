import RoleModel from '../../src/models/role';

describe('Role Model', () => {
  test('can model new role data', () => {
    const roleInfo = {
      name: 'Super Admin',
      description: 'Super admin role',
      abbreviation: 'SAD',
      roleId: 1,
      actions: ['CREATE', 'VIEW', 'UPDATE', 'DELETE'],
    };

    const newRole = new RoleModel(roleInfo);
    const actions = Array.from(newRole.actions);
    expect(newRole).toBeDefined();
    expect(newRole).toHaveProperty('name', roleInfo.name);
    expect(newRole).toHaveProperty('description', roleInfo.description);
    expect(newRole).toHaveProperty('description', roleInfo.description);
    expect(newRole).toHaveProperty('abbreviation', roleInfo.abbreviation);
    expect(newRole).toHaveProperty('roleId', roleInfo.roleId);
    expect(actions).toEqual(roleInfo.actions);
  });
});
