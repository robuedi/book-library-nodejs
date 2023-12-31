import path from "path";
import dotenv from "dotenv";
import { Dialect } from "sequelize";


// parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// interface to load env variables
// some vars may be undefined as the user may not set them
interface ENV {
  NODE_ENV: string | undefined
  APP_PORT: number | undefined
  DB_DIALECT: Dialect | undefined
  DB_HOST: string | undefined
  DB_PORT: number | null | undefined
  DB_DATABASE: string | undefined
  DB_USERNAME: string | undefined
  DB_PASSWORD: string | undefined
  DB_POOL_MAX: number | undefined
  DB_POOL_MIN: number | undefined
  DB_POOL_ACQUIRE: number | undefined
  DB_POOL_IDLE: number | undefined
  SECURITY_RATE_LIMITER_MAX_REQ: number | undefined
  SECURITY_RATE_LIMITER_MAX_REQ_TIME: number | undefined
}

interface Config {
  NODE_ENV: string
  APP_PORT: number
  DB_DIALECT: Dialect
  DB_HOST: string
  DB_PORT: number | null
  DB_DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_POOL_MAX: number
  DB_POOL_MIN: number
  DB_POOL_ACQUIRE: number
  DB_POOL_IDLE: number
  SECURITY_RATE_LIMITER_MAX_REQ: number
  SECURITY_RATE_LIMITER_MAX_REQ_TIME: number
}

// loading process.env as ENV interface
const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3001,
    DB_DIALECT: process.env.DB_DIALECT as Dialect || undefined,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : null,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_POOL_MAX: process.env.DB_POOL_MAX ? Number(process.env.DB_POOL_MAX) : undefined,
    DB_POOL_MIN: process.env.DB_POOL_MIN ? Number(process.env.DB_POOL_MIN) : undefined,
    DB_POOL_ACQUIRE: process.env.DB_POOL_ACQUIRE ? Number(process.env.DB_POOL_ACQUIRE) : undefined,
    DB_POOL_IDLE: process.env.DB_POOL_IDLE ? Number(process.env.DB_POOL_IDLE) : undefined, 
    SECURITY_RATE_LIMITER_MAX_REQ: process.env.SECURITY_RATE_LIMITER_MAX_REQ ? Number(process.env.SECURITY_RATE_LIMITER_MAX_REQ) : 1000,
    SECURITY_RATE_LIMITER_MAX_REQ_TIME: process.env.SECURITY_RATE_LIMITER_MAX_REQ_TIME ? Number(process.env.SECURITY_RATE_LIMITER_MAX_REQ_TIME) : 1,
  };
};

// if any of the required config is missing then we won't start the app as we may not connect to the DB
const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

