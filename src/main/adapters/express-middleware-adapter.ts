import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../../presentation/interfaces/controller'
import { Middleware } from '../../presentation/interfaces/middleware'

interface CustomRequest extends Request {
  currentUserId?: any
}

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      queryParams: req.query,
      params: req.params,
      body: req.body,
      currentUserId: req.currentUserId,
      file: req.file,
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse?.statusCode !== 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      req.currentUserId = httpResponse?.body?.currentUserId
      next()
    }
  }
}
