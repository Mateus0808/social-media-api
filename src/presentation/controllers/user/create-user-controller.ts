import { CreateUserServiceInterface } from '@application/interfaces/user-interface/create-user-service-interface'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { checkApplicationError } from '../../helpers/application-errors-helper'
import { badRequest, created } from '../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../interfaces/controller'

export class CreateUserController implements Controller {
  constructor(private readonly createUserService: CreateUserServiceInterface) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      console.log('Chegou aqui', httpRequest.body)
      const requiredParams = [
        'username',
        'name',
        'lastName',
        'phone',
        'maritalStatus',
        'birthDate',
        'email',
        'gender',
        'password',
      ]

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

      const {
        username,
        name,
        lastName,
        phone,
        birthDate,
        maritalStatus,
        gender,
        email,
        password,
      } = httpRequest.body

      const userCreated = await this.createUserService.createUser({
        username,
        name,
        lastName,
        phone,
        birthDate,
        maritalStatus,
        gender,
        email,
        password,
      })

      return created(userCreated)
    } catch (error: any) {
      console.log(error)
      return checkApplicationError(error)
    }
  }
}
