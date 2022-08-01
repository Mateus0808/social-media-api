import { checkApplicationError } from '../../helpers/application-errors-helper'
import { Validator } from '../../interfaces/validator'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok } from '../../helpers/http-helper'
import { UpdateUserEmailServiceInterface } from '../../../application/interfaces/user-interface/update-user-email-service-interface'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class UpdateUserEmailController implements Controller {
  constructor(
    private updateUserEmailService: UpdateUserEmailServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['email']

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
      const { email } = httpRequest.body
      const response = await this.updateUserEmailService.updateUserEmail({
        userId,
        email,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
