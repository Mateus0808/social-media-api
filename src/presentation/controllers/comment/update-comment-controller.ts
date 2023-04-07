import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { checkApplicationError } from '@presentation/helpers/application-errors-helper'
import { badRequest, ok } from '@presentation/helpers/http-helper'
import { UpdateCommentServiceInterface } from '@application/interfaces/comment-interface/update-comment-service-interface'
import { Validator } from '@presentation/interfaces/validator'

export class UpdateCommentController implements Controller {
  constructor(
    private readonly updateCommentService: UpdateCommentServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['comment', 'userId', 'postId']

      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new InvalidParamError(param))
        }
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { comment, userId, postId } = httpRequest.body
      const { commentId } = httpRequest.params

      const response = await this.updateCommentService.updateComment({
        comment,
        commentId,
        userId,
        postId,
      })

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
