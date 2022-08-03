import { checkApplicationError } from '../../helpers/application-errors-helper'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { badRequest, ok } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { UpdateCommentServiceInterface } from '../../../application/interfaces/post-interface/comment-interface/update-comment-service-interface'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

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
