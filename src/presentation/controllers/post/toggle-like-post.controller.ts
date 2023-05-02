import { checkApplicationError } from './../../helpers/application-errors-helper'
import { badRequest, ok } from './../../helpers/http-helper'
import { Validator } from './../../interfaces/validator'
import { ToggleLikePostServiceInterface } from '@application/interfaces/post-interface/toggle-like-post-service.interface'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './../../interfaces/controller'

export class ToggleLikePostController implements Controller {
  private readonly postService: ToggleLikePostServiceInterface

  private readonly validator: Validator

  constructor(
    postService: ToggleLikePostServiceInterface,
    validator: Validator,
  ) {
    this.postService = postService
    this.validator = validator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { userId, postId } = httpRequest.params
      const response = await this.postService.toggleLike({ postId, userId })

      return ok(response)
    } catch (error: any) {
      console.log(error)
      return checkApplicationError(error)
    }
  }
}
