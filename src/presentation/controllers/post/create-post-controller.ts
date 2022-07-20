import { Validator } from './../../interfaces/validator';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, created } from '../../helpers/http-helper';
import { checkApplicationError } from './../../helpers/application-errors-helper';
import { Controller, HttpRequest, HttpResponse } from './../../interfaces/controller';
import { CreatePostServiceInterface } from '../../../application/interfaces/post-interface/create-post-service-interface';

export class CreatePostController implements Controller {
  constructor (
    private readonly createPostService: CreatePostServiceInterface,
    private readonly validator: Validator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['title', 'content']

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

      const { title, content } = httpRequest.body

      const postCreated = await this.createPostService.createPost({ 
        title, content, userId: httpRequest.params.userId
      })

      return created(postCreated)

    } catch (error: any) {
      return checkApplicationError(error)
    }
  }

}