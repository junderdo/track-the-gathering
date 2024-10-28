import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppRole, DECORATOR_KEY_ROLES } from './roles.decorator';

const mockReflector = createMock<Reflector>();

const mockToken = 'mock-token';
const mockAuthHeaderValue = `Bearer ${mockToken}`;

// eslint-disable-next-line @typescript-eslint/ban-types
const mockHandler: Function = () => {
  return true;
};
let mockExecutionContext: DeepMocked<ExecutionContext>;

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflectorGetSpy: jest.SpyInstance;
  let verifyJWTSpy: jest.SpyInstance;
  let verifyRolesSpy: jest.SpyInstance;
  let getTokenRolesSpy: jest.SpyInstance;

  beforeAll(() => {
    guard = new AuthGuard(mockReflector);
  });

  beforeEach(() => {
    jest.resetAllMocks();
    reflectorGetSpy = jest.spyOn(mockReflector, 'get');
    verifyJWTSpy = jest.spyOn(AuthService, 'verifyJWT');
    verifyRolesSpy = jest.spyOn(AuthService, 'verifyRoles');
    getTokenRolesSpy = jest.spyOn(AuthService, 'getTokenRoles');
    mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => {
          return {
            headers: {
              authorization: mockAuthHeaderValue,
            },
          };
        },
      }),
      getHandler: () => mockHandler,
    });
  });

  it('should return true if JWT and roles are valid', async () => {
    const mockRolesMeta: AppRole[] = ['admin', 'standard'];
    reflectorGetSpy.mockReturnValueOnce(mockRolesMeta);
    verifyJWTSpy.mockReturnValueOnce(true);
    verifyRolesSpy.mockReturnValueOnce(true);

    const res = await guard.canActivate(mockExecutionContext);

    expect(res).toBe(true);
    expect(reflectorGetSpy).toHaveBeenCalledWith(
      DECORATOR_KEY_ROLES,
      mockHandler
    );
    expect(verifyJWTSpy).toHaveBeenCalledWith(mockToken);
    expect(verifyRolesSpy).toHaveBeenCalledWith(mockRolesMeta, mockToken);
  });

  it('should throw error from authService.verifyJWT', async () => {
    const mockRolesMeta: AppRole[] = ['admin', 'standard'];
    reflectorGetSpy.mockReturnValueOnce(mockRolesMeta);
    getTokenRolesSpy.mockReturnValue(['admin']);
    verifyRolesSpy.mockReturnValueOnce(true);
    verifyJWTSpy.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    try {
      await guard.canActivate(mockExecutionContext);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
    expect.assertions(1);
  });

  it('should throw error from authService.verifyRoles', async () => {
    const mockRolesMeta: AppRole[] = ['admin', 'standard'];
    reflectorGetSpy.mockReturnValueOnce(mockRolesMeta);
    getTokenRolesSpy.mockReturnValue([]);
    verifyJWTSpy.mockReturnValueOnce(true);
    verifyRolesSpy.mockImplementationOnce(() => {
      throw new ForbiddenException();
    });

    try {
      await guard.canActivate(mockExecutionContext);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(ForbiddenException);
    }
    expect.assertions(1);
  });
});
