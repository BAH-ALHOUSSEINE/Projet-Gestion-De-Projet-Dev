import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should allow to create an instance with different values', () => {
    const user = new User();
    user.name = 'John';
    user.prenom = 'Doe';
    user.email = 'test@email.com';
    user.password = 'password';
    expect(user.name).toBe('John');
    expect(user.prenom).toBe('Doe');
    expect(user.email).toBe('test@email.com');
    expect(user.password).toBe('password');
    expect(user).toBeTruthy();
  });
});
