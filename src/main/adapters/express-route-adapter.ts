import { Request, Response } from 'express'
import {
  Controller,
  HttpRequest,
} from '../../presentation/interfaces/controller'

interface CustomRequest extends Request {
  currentUserId?: any
}

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: CustomRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      params: req.params,
      queryParams: req.query,
      body: req.body,
      currentUserId: req.currentUserId,
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
