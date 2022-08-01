import mongoose from 'mongoose'
import { env } from '../../../main/config/env'

let mongoConnection: Promise<typeof mongoose>

if (env.nodeEnv === 'production' && env.dbProduction) {
  mongoConnection = mongoose.connect(env.dbProduction)
} else if (env.nodeEnv === 'development' && env.dbDevelopment) {
  mongoConnection = mongoose.connect(env.dbDevelopment)
}

mongoose.Promise = global.Promise

export { mongoConnection }
