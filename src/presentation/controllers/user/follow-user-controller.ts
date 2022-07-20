import { FollowUserServiceInterface } from './../../../application/interfaces/follow-user-service-interface';
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/controller"
import { Validator } from "../../interfaces/validator"
import { badRequest, ok } from '../../helpers/http-helper';
import { checkApplicationError } from '../../helpers/application-errors-helper';

export class FollowUserController implements Controller {
  constructor (
    private readonly followUserService: FollowUserServiceInterface,
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { currentUserId, userId } = httpRequest.params

      const response = await this.followUserService.followUser({ currentUserId, userId })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}