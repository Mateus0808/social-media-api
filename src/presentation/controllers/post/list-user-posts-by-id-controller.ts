import { ListUserPostsServiceInterface } from '@application/interfaces/post-interface/list-user-posts-service-interface'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { badRequest, ok } from '@presentation/helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { Validator } from '@presentation/interfaces/validator'

export class ListUserPostsByIdController implements Controller {
  private readonly postService: ListUserPostsServiceInterface

  private readonly validator: Validator

  constructor(
    listUserPostsService: ListUserPostsServiceInterface,
    validator: Validator,
  ) {
    this.postService = listUserPostsService
    this.validator = validator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.params)
    if (error) {
      return badRequest(error)
    }

    const { userId } = httpRequest.params
    const possibleQueryParams = ['page', 'limit']

    for (const param of possibleQueryParams) {
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
      return badRequest(new InvalidParamError('page: deve ser maior que zero'))
    }
    if (Number(limit) <= 0) {
      return badRequest(new InvalidParamError('limit: deve ser maior que zero'))
    }

    const response = await this.postService.listUserPosts({
      page,
      limit,
      userId,
    })
    return ok(response)
  }
}
