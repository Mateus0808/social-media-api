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
      const requiredParams = ['userId', 'postId']

      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new InvalidParamError(param))
        }
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { commentId } = httpRequest.params
      const { userId, postId } = httpRequest.body
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
