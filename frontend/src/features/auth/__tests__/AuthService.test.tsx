import api from '../../../shared/api/axiosInstance';
import AuthService from '../service/AuthService';

jest.mock('../../../shared/api/axiosInstance.ts');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registerUser calls /auth/register with correct data', async () => {
    const mockData = {
      fullName: 'User',
      email: 'test@gmail.com',
      password: '123456',
    };
    (api.post as jest.Mock).mockResolvedValue({
      data: { id: 1, name: 'User' },
    });

    const res = await AuthService.registerUser(mockData);

    expect(api.post).toHaveBeenCalledWith('/auth/register', {
      name: 'User',
      email: 'test@gmail.com',
      password: '123456',
    });
    expect(res).toEqual({ id: 1, name: 'User' });
  });

  test('loginUser calls /auth/login with correct data', async () => {
    const mockData = { email: 'test@gmail.com', password: '123456' };
    (api.post as jest.Mock).mockResolvedValue({ data: { token: 'abc' } });
    const res = await AuthService.loginUser(mockData);
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@gmail.com',
      password: '123456',
    });
    expect(res).toEqual({ token: 'abc' });
  });

  test('getMe calls /auth/me', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: 1, name: 'User' } });
    const res = await AuthService.getMe();
    expect(api.get).toHaveBeenCalledWith('/auth/me');
    expect(res).toEqual({ id: 1, name: 'User' });
  });

  test('logout calls /auth/logout', async () => {
    (api.post as jest.Mock).mockResolvedValue({});
    const res = await AuthService.logout();
    expect(api.post).toHaveBeenCalledWith('/auth/logout');
    expect(res).toEqual({});
  });
});
