import { checkApplicationError } from './../../helpers/application-errors-helper'
import { badRequest, ok } from './../../helpers/http-helper'
import { Validator } from './../../interfaces/validator'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from './../../interfaces/controller'
import { ToggleLikeCommentServiceInterface } from '@application/interfaces/comment-interface/toggle-like-comment-service.interface'

export class ToggleLikeCommentController implements Controller {
  private readonly commentService: ToggleLikeCommentServiceInterface

  private readonly validator: Validator

  constructor(
    postService: ToggleLikeCommentServiceInterface,
    validator: Validator,
  ) {
    this.commentService = postService
    this.validator = validator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { userId, commentId, postId } = httpRequest.params
      const response = await this.commentService.toggleLike({
        commentId,
        userId,
        postId,
      })

      return ok(response)
    } catch (error: any) {
      console.log(error)
      return checkApplicationError(error)
    }
  }
}
