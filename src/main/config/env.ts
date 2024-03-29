import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT || 3333,
  nodeEnv: process.env.NODE_ENV,
  dbDevelopment: process.env.DB_DEVELOPMENT,
  dbProduction: process.env.DB_PRODUCTION,
  jwtSecret: process.env.JWT_SECRET,
}
