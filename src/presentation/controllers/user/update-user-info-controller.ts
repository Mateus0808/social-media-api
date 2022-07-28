import { ok, badRequest } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { UpdateUserInfoServiceInterface } from '../../../application/interfaces/update-user-info-service-interface'
import { MissingParamError } from '../../errors/missing-param-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class UpdateUserInfoController implements Controller {
  constructor(
    private readonly updateUserInfoService: UpdateUserInfoServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const possibleQueryParams = ['section']
      const possibleBodyParams = ['name', 'lastName', 'username', 'email']

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      for (const param of possibleQueryParams) {
        if (!httpRequest.queryParams[param]) {
          return badRequest(new InvalidParamError(param))
        }
      }

      for (const param of possibleBodyParams) {
        if (httpRequest.body[param]) {
          if (
            httpRequest.body[param] === 'undefined' ||
            httpRequest.body[param] === undefined
          ) {
            return badRequest(new MissingParamError(param))
          }
        }
      }

      const { name, lastName, username, email } = httpRequest.body
      const { section } = httpRequest.queryParams
      const { userId } = httpRequest.params

      const response = await this.updateUserInfoService.updateUserInfo({
        userId,
        username,
        name,
        lastName,
        email,
        section,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
