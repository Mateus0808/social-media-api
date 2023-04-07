import { CreateCommentController } from '../../../../../src/presentation/controllers/comment/create-comment-controller'
import {
  CreateCommentParams,
  CreateCommentResponse,
  CreateCommentServiceInterface,
} from '../../../../../src/application/interfaces/comment-interface/create-comment-service-interface'
import { Validator } from '../../../../../src/presentation/interfaces/validator'
import { makeValidator } from '../../../helpers/mocks/validator.mock'
import { HttpRequest } from '../../../../../src/presentation/interfaces/controller'
import {
  badRequest,
  created,
  notFound,
  serverError,
} from '../../../../../src/presentation/helpers/http-helper'
import { MissingParamError } from '../../../../../src/presentation/errors/missing-param-error'
import { ServerError } from '../../../../../src/presentation/errors/server-error'
import { CommentNotCreatedError } from '../../../../../src/application/errors/comment-errors/comment-not-created-error'
import { PostUpdateCommentError } from '../../../../../src/application/errors/post-errors/post-update-comments-error'

const fakeCreateCommentParams = (): CreateCommentParams => ({
  userId: '1',
  postId: '1',
  currentUserId: '1',
  comment: 'any_comment',
})

const fakeCreateCommentResponse = (): CreateCommentResponse => ({
  id: '1',
  user: '1',
  post: '1',
  likes: ['1'],
  comment: 'any_comment',
  createdAt: new Date('05/04/2023'),
})

const fakeHttpRequest = (): HttpRequest => ({
  params: {
    userId: '1',
    postId: '1',
  },
  body: {
    comment: 'any_comment',
  },
})

const makeCreateCommentService = (): CreateCommentServiceInterface => {
  class CreateCommentServiceStub implements CreateCommentServiceInterface {
    async createComment(
      createCommentParams: CreateCommentParams,
    ): Promise<CreateCommentResponse> {
      return new Promise(resolve => resolve(fakeCreateCommentResponse()))
    }
  }
  return new CreateCommentServiceStub()
}

interface SutTypes {
  createCommentService: CreateCommentServiceInterface
  validator: Validator
  sut: CreateCommentController
}

const makeSut = (): SutTypes => {
  const createCommentService = makeCreateCommentService()
  const validator = makeValidator()
  const sut = new CreateCommentController(createCommentService, validator)
  return {
    sut,
    createCommentService,
    validator,
  }
}

describe('CreateCommentController - Integrations with dependencies', () => {
  it('Should returns 400 if no comment is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = fakeHttpRequest()
    delete httpRequest.body.comment

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('comment')))
  })

  it('Should call Validator.validate with correct params', async () => {
    const { sut, validator } = makeSut()

    const validatorSpy = jest.spyOn(validator, 'validate')

    await sut.handle(fakeHttpRequest())
    expect(validatorSpy).toHaveBeenCalledWith(fakeHttpRequest().params)
  })

  it('Should return status 400 if Validator.validate return an error', async () => {
    const { sut, validator } = makeSut()
    jest
      .spyOn(validator, 'validate')
      .mockReturnValueOnce(new MissingParamError('userId'))

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('userId')))
  })

  it('Should call CreateCommentService.createComment with correct params', async () => {
    const { sut, createCommentService } = makeSut()
    const createCommentSpy = jest.spyOn(createCommentService, 'createComment')

    const { comment, postId, userId } = fakeCreateCommentParams()

    await sut.handle(fakeHttpRequest())
    expect(createCommentSpy).toHaveBeenCalledWith({ comment, postId, userId })
    expect(createCommentSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return status 500 if CreateCommentService.createComment throws a serve error', async () => {
    const { sut, createCommentService } = makeSut()
    jest
      .spyOn(createCommentService, 'createComment')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  it('Should return status 400 if CreateCommentService.createComment throws CommentNotCreatedError', async () => {
    const { sut, createCommentService } = makeSut()
    const { comment } = fakeCreateCommentParams()
    jest
      .spyOn(createCommentService, 'createComment')
      .mockReturnValueOnce(
        new Promise((resolve, reject) =>
          reject(new CommentNotCreatedError(comment)),
        ),
      )

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(
      badRequest(new CommentNotCreatedError(comment)),
    )
  })

  it('Should return status 400 if CreateCommentService.createComment throws PostUpdateCommentError', async () => {
    const { sut, createCommentService } = makeSut()
    jest
      .spyOn(createCommentService, 'createComment')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new PostUpdateCommentError())),
      )

    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(notFound(new PostUpdateCommentError()))
  })
})

describe('CreateCommentController - Success case', () => {
  it('Should return status 201 if comment is created', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeHttpRequest())
    expect(httpResponse).toEqual(created(fakeCreateCommentResponse()))
  })
})
