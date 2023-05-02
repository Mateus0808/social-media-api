import { GetUserByIdServiceInterface } from '@application/interfaces/user-interface/get-user-by-id-service.interface'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { badRequest, ok } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'
import { Validator } from '../../interfaces/validator'

export class GetUserByIdController implements Controller {
  constructor(
    private readonly listOneUserService: GetUserByIdServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { userId } = httpRequest.params
      const user = await this.listOneUserService.getUserById(userId)

      return ok(user)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
