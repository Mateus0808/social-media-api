import { ok } from './../../helpers/http-helper';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from './../../interfaces/controller';
import { checkApplicationError } from '../../helpers/application-errors-helper';
import { ListPostsServiceInterface } from '../../../application/interfaces/post-interface/list-post-service-interface';
import { DeletePostServiceInterface } from '../../../application/interfaces/post-interface/delete-post-service-interface';
import { Validator } from '../../interfaces/validator';

export class DeletePostController implements Controller {
  private readonly deletePostService: DeletePostServiceInterface;
  private readonly validator: Validator

  constructor (deletePostService: DeletePostServiceInterface, validator: Validator) {
    this.deletePostService = deletePostService
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      const { postId } = httpRequest.params

      const response = await this.deletePostService.deletePost(postId)

      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}