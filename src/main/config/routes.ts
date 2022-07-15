import express, { Express, Router } from 'express'
import { userRouter } from '../routes/user-routes'

export default (app: Express): void => {
  const router = Router()

  app.use(express.json())

  app.use('/api', router)

  userRouter(router)
}
