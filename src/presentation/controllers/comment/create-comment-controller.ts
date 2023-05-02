import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { CreateCommentServiceInterface } from '@application/interfaces/comment-interface/create-comment-service-interface'
import { badRequest, created } from '@presentation/helpers/http-helper'
import { checkApplicationError } from '@presentation/helpers/application-errors-helper'
import { MissingParamError } from '@presentation/errors/missing-param-error'
import { Validator } from '@presentation/interfaces/validator'

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
        currentUserId: httpRequest.currentUserId,
      })

      return created(commentCreated)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
