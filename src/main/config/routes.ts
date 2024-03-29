import express, { Express, Router } from 'express'
import { postRoutes } from '../routes/post-routes/index'
import { commentRouter } from '../routes/comment-routes'
import { userRouter } from '../routes/user-routes'

export default (app: Express): void => {
  const router = Router()

  app.use(express.json())

  app.use('/api', router)

  userRouter(router)
  commentRouter(router)
  postRoutes(router)
}
