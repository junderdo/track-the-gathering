import { getAppEnv, isProduction } from './shared-env';

describe('shared-env', () => {
  it('should set isProduction to false', () => {
    expect(getAppEnv()).not.toBe('production');
    expect(isProduction).toBe(false);
  });
});
