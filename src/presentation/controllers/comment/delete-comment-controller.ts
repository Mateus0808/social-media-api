import { ok, badRequest } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { DeleteCommentServiceInterface } from '../../../application/interfaces/post-interface/comment-interface/delete-comment-service-interface'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

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
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
