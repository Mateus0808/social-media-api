import { UserNotFoundError } from '@application/errors/user-not-found-error'
import { getToken } from '../helpers/authorization-header-helper'
import { badRequest } from '../helpers/http-helper'
import { Middleware } from '../interfaces/middleware'
import { HttpRequest, HttpResponse } from '../interfaces/controller'
import { EncrypterVerifier } from '../../application/ports/encrypter/encrypter'
import { LoadUserByIdRepositoryInterface } from '../../application/ports/repositories/user/load-user-by-id-repository-interface'
import { checkApplicationError } from '../helpers/application-errors-helper'
import { MissingHeaderError } from '../errors/missing-header-error'

export class AdminPermissionMiddleware implements Middleware {
  constructor(
    private readonly encrypterVerifier: EncrypterVerifier,
    private readonly loadUserByIdRepository: LoadUserByIdRepositoryInterface,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authorizationHeader = httpRequest.headers.authorization
      if (!authorizationHeader) {
        return badRequest(new MissingHeaderError('authorization'))
      }

      const token = getToken(authorizationHeader)
      const { id } = await this.encrypterVerifier.verify(token)

      const user = await this.loadUserByIdRepository.loadById(id)
      if (!user) {
        return badRequest(new UserNotFoundError())
      }

      return {
        body: { currentUserId: id },
        statusCode: 200,
      }
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
}
