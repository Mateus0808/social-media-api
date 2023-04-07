import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { badRequest, ok } from '@presentation/helpers/http-helper'
import { checkApplicationError } from '@presentation/helpers/application-errors-helper'
import { Validator } from '@presentation/interfaces/validator'
import { DeletePostServiceInterface } from '@application/interfaces/post-interface/delete-post-service-interface'

export class DeletePostController implements Controller {
  private readonly deletePostService: DeletePostServiceInterface

  private readonly validator: Validator

  constructor(
    deletePostService: DeletePostServiceInterface,
    validator: Validator,
  ) {
    this.deletePostService = deletePostService
    this.validator = validator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { postId } = httpRequest.params

      const response = await this.deletePostService.deletePost(postId)

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
