import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { DeleteCommentServiceInterface } from '@application/interfaces/comment-interface/delete-comment-service-interface'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { checkApplicationError } from '@presentation/helpers/application-errors-helper'
import { badRequest, ok } from '@presentation/helpers/http-helper'
import { Validator } from '@presentation/interfaces/validator'

export class DeleteCommentController implements Controller {
  constructor(
    private readonly deleteCommentService: DeleteCommentServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { userId, postId, commentId } = httpRequest.params
      const response = await this.deleteCommentService.deleteComment({
        userId,
        commentId,
        postId,
        currentUserId: httpRequest.currentUserId,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
