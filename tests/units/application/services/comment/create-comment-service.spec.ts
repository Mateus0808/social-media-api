import { UserNotAuthorizedError } from '../../../../../src/application/errors/user-not-authorized-error'
import { CreateCommentService } from '../../../../../src/application/services/comment-services/create-comment-service'
import {
  UpdatePostCommentsRepositoryInterface,
  UpdatePostCommentsRepositoryParams,
  UpdatePostCommentsRepositoryResponse,
} from '../../../../../src/application/ports/repositories/post/update-post-comments-repository-interface'
import { CommentDbModel } from '../../../../../src/application/ports/repositories/models/comment-model'
import {
  CreateCommentRepositoryInterface,
  CreateCommentRepositoryParams,
} from '../../../../../src/application/ports/repositories/comment/create-comment-repository-interface'
import { CreateCommentParams } from '../../../../../src/application/interfaces/comment-interface/create-comment-service-interface'
import { CommentNotCreatedError } from '../../../../../src/application/errors/comment-errors/comment-not-created-error'
import { PostUpdateCommentError } from '../../../../../src/application/errors/post-errors/post-update-comments-error'
import { fakeDbComment } from '../../../helpers/fake-datas/fake-comment-data'

const fakeCommentParams = (): CreateCommentParams => ({
  userId: 'any_user_id',
  postId: 'any_post_id',
  currentUserId: 'any_user_id',
  comment: 'any_comment',
})

const fakeUpdateCommentsRepositoryParams =
  (): UpdatePostCommentsRepositoryParams => ({
    commentId: 'any_comment_id',
    postId: 'any_post_id',
  })

const makeCreateCommentRepository = (): CreateCommentRepositoryInterface => {
  class CreateCommentRepositoryStub
    implements CreateCommentRepositoryInterface
  {
    async createComment(
      createCommentRepositoryParams: CreateCommentRepositoryParams,
    ): Promise<CommentDbModel | null> {
      return new Promise(resolve => resolve(fakeDbComment()))
    }
  }
  return new CreateCommentRepositoryStub()
}

const makeUpdatePostCommentsRepository =
  (): UpdatePostCommentsRepositoryInterface => {
    class UpdatePostCommentsRepositoryStub
      implements UpdatePostCommentsRepositoryInterface
    {
      async updatePostComments(
        updatePostCommentsParams: UpdatePostCommentsRepositoryParams,
      ): Promise<UpdatePostCommentsRepositoryResponse | null> {
        return new Promise(resolve => resolve(fakeDbComment()))
      }
    }
    return new UpdatePostCommentsRepositoryStub()
  }

interface SutTypes {
  sut: CreateCommentService
  createCommentRepository: CreateCommentRepositoryInterface
  updatePostCommentsRepository: UpdatePostCommentsRepositoryInterface
}

const makeSut = (): SutTypes => {
  const createCommentRepository = makeCreateCommentRepository()
  const updatePostCommentsRepository = makeUpdatePostCommentsRepository()
  const sut = new CreateCommentService(
    createCommentRepository,
    updatePostCommentsRepository,
  )
  return {
    sut,
    createCommentRepository,
    updatePostCommentsRepository,
  }
}

describe('CreateCommentService - Integrations with dependencies', () => {
  it('Should create a new comment with correct parameters', async () => {
    const { sut, createCommentRepository } = makeSut()
    const { comment, postId, userId } = fakeCommentParams()

    const createCommentSpy = jest.spyOn(
      createCommentRepository,
      'createComment',
    )
    await sut.createComment(fakeCommentParams())
    expect(createCommentSpy).toHaveBeenCalledTimes(1)
    expect(createCommentSpy).toHaveBeenCalledWith({ comment, postId, userId })
  })

  it('Should throw UserNotAuthorizedError if userId is different from currentUserId', async () => {
    const { sut } = makeSut()
    const currentUserId = 'another_user_id'

    const { comment, postId, userId } = fakeCommentParams()

    const promise = sut.createComment({
      comment,
      postId,
      userId,
      currentUserId,
    })
    expect(promise).rejects.toThrow(new UserNotAuthorizedError())
  })

  it('Should throw an error if CreateCommentRepository.createComment returns null', async () => {
    const { sut, createCommentRepository } = makeSut()
    jest
      .spyOn(createCommentRepository, 'createComment')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.createComment(fakeCommentParams())
    expect(promise).rejects.toThrow(
      new CommentNotCreatedError(fakeCommentParams().comment),
    )
  })

  it('Should throw an error if CommentRepository.createComment throws', async () => {
    const { sut, createCommentRepository } = makeSut()
    jest
      .spyOn(createCommentRepository, 'createComment')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.createComment(fakeCommentParams())
    expect(promise).rejects.toThrow()
  })

  it('Should update a comment CommentsRepository.updateComment with corrects params', async () => {
    const { sut, updatePostCommentsRepository } = makeSut()
    const updateCommentSpy = jest.spyOn(
      updatePostCommentsRepository,
      'updatePostComments',
    )
    await sut.createComment(fakeCommentParams())
    expect(updateCommentSpy).toHaveBeenCalledTimes(1)
    expect(updateCommentSpy).toHaveBeenCalledWith(
      fakeUpdateCommentsRepositoryParams(),
    )
  })

  it('Should an error if CommentsRepositoryParams.updateComment returns  null', async () => {
    const { sut, updatePostCommentsRepository } = makeSut()
    jest
      .spyOn(updatePostCommentsRepository, 'updatePostComments')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.createComment(fakeCommentParams())

    expect(promise).rejects.toThrow(new PostUpdateCommentError())
  })

  it('Should an error if CommentsRepositoryParams.updateComment throws', async () => {
    const { sut, updatePostCommentsRepository } = makeSut()
    jest
      .spyOn(updatePostCommentsRepository, 'updatePostComments')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.createComment(fakeCommentParams())

    expect(promise).rejects.toThrow()
  })
})
