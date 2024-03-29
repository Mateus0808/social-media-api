import { MissingParamError } from '../../errors/missing-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { badRequest, created } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'
import { CreateCommentServiceInterface } from '../../../application/interfaces/post-interface/comment-interface/create-comment-service-interface'
import { Validator } from '../../interfaces/validator'

export class CreateCommentController implements Controller {
  constructor(
    private readonly createCommentService: CreateCommentServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { comment } = httpRequest.body
      if (!comment) {
        return badRequest(new MissingParamError('comment'))
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { postId, userId } = httpRequest.params
      const commentCreated = await this.createCommentService.createComment({
        comment,
        postId,
        userId,
      })

      return created(commentCreated)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
