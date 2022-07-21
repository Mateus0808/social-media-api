import { ok, badRequest } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'

import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { ListPostsServiceInterface } from '../../../application/interfaces/post-interface/list-post-service-interface'

export class ListPostsController implements Controller {
  private readonly listPostsService: ListPostsServiceInterface

  constructor(listPostsService: ListPostsServiceInterface) {
    this.listPostsService = listPostsService
  }

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

      const response = await this.listPostsService.listPosts({ page, limit })
      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
