import express, { Express, Router } from 'express'
import { commentRouter } from '../routes/comment-routes'
import { userRouter } from '../routes/user-routes'

export default (app: Express): void => {
  const router = Router()

  app.use(express.json())

  app.use('/api', router)

  userRouter(router)
  commentRouter(router)
}
