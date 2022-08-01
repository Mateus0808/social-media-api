import { checkApplicationError } from '../../helpers/application-errors-helper'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { UpdateUserUsernameServiceInterface } from '../../../application/interfaces/user-interface/update-user-username-service-interface'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class UpdateUserUsernameController implements Controller {
  constructor(
    private updateUserUsernameService: UpdateUserUsernameServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['username']

      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      for (const param of requiredParams) {
        if (typeof httpRequest.body[param] !== 'string') {
          return badRequest(new InvalidParamError(param))
        }
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { userId } = httpRequest.params
      const { username } = httpRequest.body
      const response = await this.updateUserUsernameService.updateUserUsername({
        userId,
        username,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
