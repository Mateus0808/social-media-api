import dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV,
  dbProduction: process.env.DB_PRODUCTION
}
