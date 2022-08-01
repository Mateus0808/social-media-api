import { checkApplicationError } from '../../helpers/application-errors-helper'
import { ok, badRequest } from '../../helpers/http-helper'
import { Validator } from '../../interfaces/validator'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { UserTimelineServiceInterface } from '../../../application/interfaces/user-interface/user-timeline-service-interface'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class UserTimelineController implements Controller {
  constructor(
    private readonly userTimelineService: UserTimelineServiceInterface,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const possibleParams = ['page', 'limit']

      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }

      for (const param of possibleParams) {
        if (httpRequest.queryParams[param]) {
          if (
            httpRequest.queryParams[param] === 'undefined' ||
            httpRequest.queryParams[param] === undefined
          ) {
            return badRequest(new InvalidParamError(param))
          }
        }
      }

      const { userId } = httpRequest.params
      const { page, limit } = httpRequest.queryParams
      if (Number(page) <= 0) {
        return badRequest(
          new InvalidParamError('page: deve ser maior que zero'),
        )
      }
      if (Number(limit) <= 0) {
        return badRequest(
          new InvalidParamError('limit: deve ser maior que zero'),
        )
      }

      const response = await this.userTimelineService.userTimeline({
        userId,
        page,
        limit,
      })
      return ok(response)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
