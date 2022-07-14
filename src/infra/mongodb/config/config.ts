import mongoose from 'mongoose'
import { env } from '../../../main/config/env'

let mongoConnection: Promise<typeof mongoose>

if (env.nodeEnv && env.dbProduction) {
  mongoConnection = mongoose.connect(env.dbProduction)
}

mongoose.Promise = global.Promise

export { mongoConnection }
