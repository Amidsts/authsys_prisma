import "dotenv/config";

const { env } = process;

const appConfig = {
  environment: env.NODE_ENV,
  port: env.PORT,
  hashPepper: env.HASH_PEPPER,
  saltRounds: 5,
  sessionLifeSpan: 1000*60*60,
  jwtSecret: env.JWT_SECRET
};

export default appConfig;
