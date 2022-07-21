import { ListCommentsServiceInterface } from '../../../application/interfaces/post-interface/comment-interface/list-comments-service-interface'

import { InvalidParamError } from '../../errors/invalid-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { badRequest, ok } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class ListCommentsController implements Controller {
  constructor(
    private readonly listCommentsService: ListCommentsServiceInterface,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const possibleParams = ['page', 'limit']

      for (const param of possibleParams) {
        if (httpRequest.queryParams[param]) {
          if (
            httpRequest.queryParams[param] === 'undefined' ||
            httpRequest.queryParams[param] === undefined
          ) {
            return badRequest(new InvalidParamError(param))
          }
        }
      }

      const { page, limit } = httpRequest.queryParams
      if (Number(page) <= 0) {
        return badRequest(
          new InvalidParamError('page: deve ser maior que zero'),
        )
      }
      if (Number(limit) <= 0) {
        return badRequest(
          new InvalidParamError('limit: deve ser maior que zero'),
        )
      }

      const response = await this.listCommentsService.listComments({
        page,
        limit,
      })
      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
