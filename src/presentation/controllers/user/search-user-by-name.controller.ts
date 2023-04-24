import { checkApplicationError } from './../../helpers/application-errors-helper'
import { Validator } from './../../interfaces/validator'
import { badRequest, ok } from './../../helpers/http-helper'
import { InvalidParamError } from './../../errors/invalid-param-error'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './../../interfaces/controller'
import { SearchUserByNameServiceInterface } from '@application/interfaces/user-interface/search-user-by-name-service-interface'

export class SearchUserByNameController implements Controller {
  constructor(
    private readonly userService: SearchUserByNameServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const possibleParams = ['name', 'page', 'limit']

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

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { name, page, limit } = httpRequest.queryParams
      const response = await this.userService.searchUserByName({
        currentUserId: httpRequest.currentUserId,
        userId: httpRequest.params.userId,
        name,
        page,
        limit,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
