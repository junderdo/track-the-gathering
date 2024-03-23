export const getAppEnv = () => process.env['NODE_ENV'] ?? 'development';
export const isProduction = getAppEnv() === 'production';

// eslint-disable-next-line @typescript-eslint/no-var-requires
if (!isProduction) require('dotenv').config({ path: '.env' });
