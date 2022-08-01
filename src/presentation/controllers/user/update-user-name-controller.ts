import { UpdateUserNameServiceInterface } from '../../../application/interfaces/user-interface/update-user-name-service-interface'
import { ok, badRequest } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { MissingParamError } from '../../errors/missing-param-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class UpdateUserNameController implements Controller {
  constructor(
    private readonly updateUserNameService: UpdateUserNameServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'lastName']

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

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

      const { userId } = httpRequest.params
      const { name, lastName } = httpRequest.body

      const response = await this.updateUserNameService.updateUserName({
        userId,
        name,
        lastName,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
