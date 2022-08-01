import { checkApplicationError } from '../../helpers/application-errors-helper'
import { AuthUserServiceInterface } from '../../../application/interfaces/user-interface/auth-user-service-interface'
import { badRequest, ok } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'
import { Validator } from '../../interfaces/validator'

export class AuthUserController implements Controller {
  constructor(
    private readonly authUserService: AuthUserServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const response = await this.authUserService.auth({ email, password })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
