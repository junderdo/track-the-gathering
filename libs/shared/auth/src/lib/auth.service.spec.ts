import { EnvTestUtil } from '@track-the-gathering/shared/env';
import { AuthService } from './auth.service';
const mockJwt = 'mock-jwt';
const mockName = 'Mock User';
const mockEmail = 'test@email.com';
const mockNamespaceBase = 'https://test-audience.com';
const mockUser = { name: mockName, email: mockEmail };
const mockRoles = ['admin'];
jest.mock('jose', () => {
  return {
    decodeJwt: () => ({
      [`${mockNamespaceBase}/user`]: mockUser,
      [`${mockNamespaceBase}/roles`]: mockRoles,
    }),
    jwtVerify: () => {
      return;
    },
    createRemoteJWKSet: () => {
      return async () => {};
    },
  };
});

describe('AuthService', () => {
  const envTestUtil = new EnvTestUtil();

  beforeEach(() => {
    jest.resetModules();
    envTestUtil.setMockEnvVars();
    process.env['AUTH0_NAMESPACE_BASE'] = mockNamespaceBase;
  });

  afterAll(() => {
    envTestUtil.resetEnv();
  });

  describe('getPropFromJwt', () => {
    it('should return property from JWT if valid', () => {
      const res = AuthService.getPropFromJwt('user', mockJwt);
      expect(res).toBe(mockUser);
    });

    it('should throw error for invalid property', () => {
      try {
        console.log(AuthService.getPropFromJwt('invalid', mockJwt));
      } catch (err) {
        expect((err as Error).message).toContain('Invalid token property.');
      }
      expect.assertions(1);
    });
  });

  describe('verifyJWT', () => {
    it('should verify JWT', () => {
      //TODO
    });

    it('should throw 401 error if JWT is invalid', () => {
      //TODO
    });
  });

  describe('verifyRoles', () => {
    it('should return true if no roles are required', () => {
      const res = AuthService.verifyRoles([], mockJwt);
      expect(res).toBe(true);
    });

    it('should return true if requesting user has proper roles', () => {
      //TODO
    });

    it('should throw 403 error if requesting user does not have proper roles', () => {
      //TODO
    });
  });
});
