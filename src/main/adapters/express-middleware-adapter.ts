import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../../presentation/interfaces/controller'
import { Middleware } from '../../presentation/interfaces/middleware'

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      queryParams: req.query,
      params: req.params,
      body: req.body,
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      next()
    }
  }
}
