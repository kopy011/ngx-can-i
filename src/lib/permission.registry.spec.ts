import { Action, Entity, toKey } from './permission.registry';

describe('PermissionRegistry', () => {
  describe('toKey', () => {
    const action = 'edit' as Action;
    const entity = 'User' as Entity;

    it('Return a PermissionKey with the correct format', () => {
      const result = toKey(action, entity);
      expect(result).toEqual('edit:User');
    });
  });
});
