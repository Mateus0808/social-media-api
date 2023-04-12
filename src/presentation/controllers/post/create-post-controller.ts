import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@presentation/interfaces/controller'
import { MissingParamError } from '@presentation/errors/missing-param-error'
import { badRequest, created } from '@presentation/helpers/http-helper'
import { checkApplicationError } from '@presentation/helpers/application-errors-helper'
import { CreatePostServiceInterface } from '@application/interfaces/post-interface/create-post-service-interface'
import { InvalidParamError } from '@presentation/errors/invalid-param-error'
import { Validator } from '@presentation/interfaces/validator'

export class CreatePostController implements Controller {
  constructor(
    private readonly createPostService: CreatePostServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['caption']

      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }

      for (const param of requiredParams) {
        if (typeof httpRequest.body[param] !== 'string') {
          return badRequest(new InvalidParamError(param))
        }
      }

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { caption } = httpRequest.body

      const postCreated = await this.createPostService.createPost({
        caption,
        image: '',
        userId: httpRequest.params.userId,
      })

      return created(postCreated)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
