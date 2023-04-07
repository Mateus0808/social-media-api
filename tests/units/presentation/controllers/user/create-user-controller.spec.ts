import { CreateUserController } from '../../../../../src/presentation/controllers/user/create-user-controller'

import {
  CreateUserParams,
  CreateUserResponse,
  CreateUserServiceInterface,
} from '../../../../../src/application/interfaces/user-interface/create-user-service-interface'
import { HttpRequest } from '../../../../../src/presentation/interfaces/controller'
import { MissingParamError } from '../../../../../src/presentation/errors/missing-param-error'
import {
  badRequest,
  conflict,
  created,
  notFound,
  serverError,
} from '../../../../../src/presentation/helpers/http-helper'
import { InvalidParamError } from '../../../../../src/presentation/errors/invalid-param-error'
import { ServerError } from '../../../../../src/presentation/errors/server-error'
import { UserAlreadyExistsError } from '../../../../../src/application/errors/user-already-exists-error'
import { UserNotCreatedError } from '../../../../../src/application/errors/user-not-created-error'

const fakeCreateUserParams = (): CreateUserParams => ({
  name: 'any_name',
  lastName: 'any_lastName',
  gender: 'MALE',
  maritalStatus: 'any_maritalStatus',
  birthDate: '09/09/1991',
  phone: '999999999',
  email: 'any_email@email.com',
  password: '123123',
})

const fakeCreateUserResponse = (): CreateUserResponse => ({
  id: '1',
  username: '',
  name: 'any_name',
  lastName: 'any_lastName',
  gender: 'MALE',
  maritalStatus: 'any_maritalStatus',
  birthDate: new Date('09/09/1991'),
  phone: '999999999',
  email: 'any_email@email.com',
  followers: [],
  followings: [],
  createdAt: new Date('06/04/2023'),
})

const fakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    lastName: 'any_lastName',
    gender: 'MALE',
    maritalStatus: 'any_maritalStatus',
    birthDate: '09/09/1991',
    phone: '999999999',
    email: 'any_email@email.com',
    password: '123123',
  },
})

const makeCreateUserService = (): CreateUserServiceInterface => {
  class CreateUserServiceStub implements CreateUserServiceInterface {
    async createUser(
      createUserParams: CreateUserParams,
    ): Promise<CreateUserResponse> {
      return new Promise<CreateUserResponse>(resolve =>
        resolve(fakeCreateUserResponse()),
      )
    }
  }
  return new CreateUserServiceStub()
}

interface SutTypes {
  createUserService: CreateUserServiceInterface
  sut: CreateUserController
}

const makeSut = (): SutTypes => {
  const createUserService = makeCreateUserService()
  const sut = new CreateUserController(createUserService)
  return {
    sut,
    createUserService,
  }
}

describe('CreateUserController - Missing params', () => {
  it('Should returns 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.name

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
    expect(httpResponse.statusCode).toEqual(400)
  })

  it('Should returns 400 if no lastName is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.lastName

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('lastName')))
    expect(httpResponse.statusCode).toEqual(400)
  })

  it('Should returns 400 if no gender is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.gender

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('gender')))
    expect(httpResponse.statusCode).toEqual(400)
  })

  it('Should returns 400 if no maritalStatus is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.maritalStatus

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('maritalStatus')),
    )
    expect(httpResponse.statusCode).toEqual(400)
  })

  it('Should returns 400 if no birthDate is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.birthDate

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('birthDate')))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should returns 400 if no phone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.phone

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('phone')))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should returns 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.email

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should returns 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    delete httpRequest.body.password

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    expect(httpResponse.statusCode).toBe(400)
  })
})

describe('UserController - Invalid params', () => {
  it('Should returns 400 if name type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.name = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('name')))
  })

  it('Should returns 400 if lastName type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.lastName = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('lastName')))
  })

  it('Should returns 400 if gender type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.gender = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('gender')))
  })

  it('Should returns 400 if maritalStatus type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.maritalStatus = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('maritalStatus')),
    )
  })

  it('Should returns 400 if birthDate type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.birthDate = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('birthDate')))
  })

  it('Should returns 400 if phone type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.phone = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('phone')))
  })

  it('Should returns 400 if email type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.email = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('Should returns 400 if password type is not string', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()

    httpRequest.body.password = 1

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('password')))
  })
})

describe('CreateUserController - Integration with dependencies', () => {
  it('Should call CreateUserService.create with correct params', async () => {
    const { sut, createUserService } = makeSut()
    const createUserSpy = jest.spyOn(createUserService, 'createUser')

    const httpRequest = fakeHttpRequest()

    await sut.handle(httpRequest)
    expect(createUserSpy).toBeCalledTimes(1)
    expect(createUserSpy).toBeCalledWith(fakeCreateUserParams())
  })

  it('Should return status 500 if CreateUserService.create throws a server error', async () => {
    const { sut, createUserService } = makeSut()
    jest
      .spyOn(createUserService, 'createUser')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should return status 409 if CreateUserService.create throws UserAlreadyExistsError', async () => {
    const { sut, createUserService } = makeSut()
    jest
      .spyOn(createUserService, 'createUser')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new UserAlreadyExistsError('any_email@email.com')),
        ),
      )
    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(
      conflict(new UserAlreadyExistsError('any_email@email.com')),
    )
    expect(httpResponse.statusCode).toBe(409)
  })

  it('Should return status 404 if CreateUserService.create throws UserNotCreatedError', async () => {
    const { sut, createUserService } = makeSut()
    jest
      .spyOn(createUserService, 'createUser')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new UserNotCreatedError('any_email@email.com')),
        ),
      )

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse).toEqual(
      notFound(new UserNotCreatedError('any_email@email.com')),
    )
  })
})

describe('UserController - Success case', () => {
  it('Should return status 201 if succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(created(fakeCreateUserResponse()))
    expect(httpResponse.statusCode).toBe(201)
  })
})
