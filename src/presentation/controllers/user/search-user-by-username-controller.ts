import { checkApplicationError } from './../../helpers/application-errors-helper'
import { MissingParamError } from './../../errors/missing-param-error'
import { Validator } from './../../interfaces/validator'
import { badRequest, ok } from './../../helpers/http-helper'
import { InvalidParamError } from './../../errors/invalid-param-error'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './../../interfaces/controller'
import { SearchUserByUsernameServiceInterface } from '@application/interfaces/user-interface/search-user-by-username-service-interface'

export class SearchUserByUsernameController implements Controller {
  constructor(
    private readonly userService: SearchUserByUsernameServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['username']

      for (const param of requiredParams) {
        if (!httpRequest.queryParams[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      for (const param of requiredParams) {
        if (typeof httpRequest.queryParams[param] !== 'string') {
          return badRequest(new InvalidParamError(param))
        }
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { username } = httpRequest.queryParams
      const response = await this.userService.searchUserByUsername({
        currentUserId: httpRequest.currentUserId,
        userId: httpRequest.params.userId,
        username,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
