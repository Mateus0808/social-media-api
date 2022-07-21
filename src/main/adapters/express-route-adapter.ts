import { Request, Response } from 'express'
import {
  Controller,
  HttpRequest,
} from '../../presentation/interfaces/controller'

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      params: req.params,
      queryParams: req.query,
      body: req.body,
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
