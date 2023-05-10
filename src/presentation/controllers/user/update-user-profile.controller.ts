import { ok, badRequest } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { MissingParamError } from '../../errors/missing-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'
import { IUploadUserProfileService } from '@application/interfaces/user-interface/profile/upload-user-profile-service.interface'

export class UploadUserProfileController implements Controller {
  constructor(
    private readonly updateUserNameService: IUploadUserProfileService,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      if (!httpRequest.file) {
        return badRequest(new MissingParamError('profile'))
      }

      const { userId } = httpRequest.params
      const { file } = httpRequest
      const response = await this.updateUserNameService.uploadUserProfile({
        userId,
        file,
      })

      return ok(response)
    } catch (error: any) {
      console.log(error)
      return checkApplicationError(error)
    }
  }
}
