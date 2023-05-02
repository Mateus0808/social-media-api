import { CommentNotDeletedError } from '../../../../../src/application/errors/comment-errors/comment-not-deleted-error'
import { CommentNotDeletedOnPostError } from '../../../../../src/application/errors/comment-errors/comment-not-deleted-on-post-error'
import { CommentNotBelongPostError } from '../../../../../src/application/errors/comment-errors/comment-not-belong-post-error'
import { DeleteCommentService } from '../../../../../src/application/services/comment-services/delete-comment-service'
import { DeleteCommentOnAPostRepositoryInterface } from '../../../../../src/application/ports/repositories/post/delete-comment-on-a-post-repository-interface'
import { DeleteCommentRepositoryInterface } from '../../../../../src/application/ports/repositories/comment/delete-comment-repository-interface'
import {
  DeleteCommentParams,
  DeleteCommentServiceResponse,
} from '../../../../../src/application/interfaces/comment-interface/delete-comment-service-interface'
import { UserNotAuthorizedError } from '../../../../../src/application/errors/user-not-authorized-error'
import { CommentNotFoundError } from '../../../../../src/application/errors/comment-errors/comment-not-found-error'
import { GetCommentByIdRepositoryInterface } from '../../../../../src/application/ports/repositories/comment/get-comment-by-id-repository-interface'
import { CommentDbModel } from '../../../../../src/application/ports/repositories/models/comment-model'
import { fakeDbComment } from '../../../helpers/fake-datas/fake-comment-data'

const fakeDeleteCommentParams = (): DeleteCommentParams => ({
  commentId: 'any_comment_id',
  postId: 'any_post_id',
  currentUserId: 'any_user_id',
  userId: 'any_user_id',
})

const fakeDeleteCommentResponse = (): DeleteCommentServiceResponse => ({
  message: 'any_delete_comment',
  success: true,
})

const makeGetCommentByIdRepository = (): GetCommentByIdRepositoryInterface => {
  class GetCommentByIdRepositoryStub
    implements GetCommentByIdRepositoryInterface
  {
    async getCommentById(): Promise<CommentDbModel | null> {
      return new Promise(resolve => resolve(fakeDbComment()))
    }
  }
  return new GetCommentByIdRepositoryStub()
}

const makeDeleteCommentRepository = (): DeleteCommentRepositoryInterface => {
  class DeleteCommentRepositoryStub
    implements DeleteCommentRepositoryInterface
  {
    async deleteComment(): Promise<boolean | null> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new DeleteCommentRepositoryStub()
}

const makeDeleteCommentOnAPostRepository =
  (): DeleteCommentOnAPostRepositoryInterface => {
    class DeleteCommentOnAPostRepositoryStub
      implements DeleteCommentOnAPostRepositoryInterface
    {
      async deleteCommentOnAPost(): Promise<boolean | null> {
        return new Promise(resolve => resolve(true))
      }
    }
    return new DeleteCommentOnAPostRepositoryStub()
  }

interface SutTypes {
  sut: DeleteCommentService
  getCommentByIdRepository: GetCommentByIdRepositoryInterface
  deleteCommentRepository: DeleteCommentRepositoryInterface
  postRepository: DeleteCommentOnAPostRepositoryInterface
}

const makeSut = (): SutTypes => {
  const getCommentByIdRepository = makeGetCommentByIdRepository()
  const deleteCommentRepository = makeDeleteCommentRepository()
  const postRepository = makeDeleteCommentOnAPostRepository()

  const sut = new DeleteCommentService(
    postRepository,
    getCommentByIdRepository,
    deleteCommentRepository,
  )
  return {
    sut,
    getCommentByIdRepository,
    deleteCommentRepository,
    postRepository,
  }
}

describe('DeleteCommentService - Integration with dependencies', () => {
  it('Should throw UserNotAuthorizedError if userId is different from currentUserId', async () => {
    const { sut } = makeSut()
    const currentUserId = 'another_user_id'
    const { commentId, postId, userId } = fakeDeleteCommentParams()

    const promise = sut.deleteComment({
      commentId,
      postId,
      userId,
      currentUserId,
    })
    expect(promise).rejects.toThrow(new UserNotAuthorizedError())
  })

  it('Should call CommentRepository.getCommentById with corrects params', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    const getCommentSpy = jest.spyOn(getCommentByIdRepository, 'getCommentById')
    await sut.deleteComment(fakeDeleteCommentParams())
    expect(getCommentSpy).toHaveBeenCalledTimes(1)
    expect(getCommentSpy).toHaveBeenCalledWith('any_comment_id')
  })

  it('Should throw CommentNotFoundError if CommentRepository.getCommentById returns null', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    jest
      .spyOn(getCommentByIdRepository, 'getCommentById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow(new CommentNotFoundError())
  })

  it('Should throw an error if CommentRepository.getCommentById throws', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    jest
      .spyOn(getCommentByIdRepository, 'getCommentById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow()
  })

  it('Should throw CommentNotBelongPostError if comment.postId is different from postId', async () => {
    const { sut } = makeSut()
    const { commentId, currentUserId, userId } = fakeDeleteCommentParams()
    const anotherPostId = 'another_post_id'
    const promise = sut.deleteComment({
      commentId,
      currentUserId,
      postId: anotherPostId,
      userId,
    })
    expect(promise).rejects.toThrow(new CommentNotBelongPostError())
  })

  it('Should call PostRepository.deleteCommentOnAPost with corrects params', async () => {
    const { sut, postRepository } = makeSut()
    const postRepositorySpy = jest.spyOn(postRepository, 'deleteCommentOnAPost')
    const { userId, postId } = fakeDeleteCommentParams()
    await sut.deleteComment(fakeDeleteCommentParams())
    expect(postRepositorySpy).toHaveBeenCalledTimes(1)
    expect(postRepositorySpy).toHaveBeenCalledWith({ userId, postId })
  })

  it('Should throw if PostRepository.deleteCommentOnAPost throws', async () => {
    const { sut, postRepository } = makeSut()
    jest
      .spyOn(postRepository, 'deleteCommentOnAPost')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow()
  })

  it('Should throw PostNotFoundError if PostRepository.deleteCommentOnAPost returns null', async () => {
    const { sut, postRepository } = makeSut()
    jest
      .spyOn(postRepository, 'deleteCommentOnAPost')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow(new CommentNotDeletedOnPostError())
  })

  it('Should call CommentRepository.deleteComment with corrects params', async () => {
    const { sut, deleteCommentRepository } = makeSut()
    const { commentId } = fakeDeleteCommentParams()

    const deleteCommentRepositorySpy = jest.spyOn(
      deleteCommentRepository,
      'deleteComment',
    )
    await sut.deleteComment(fakeDeleteCommentParams())

    expect(deleteCommentRepositorySpy).toHaveBeenCalledTimes(1)
    expect(deleteCommentRepositorySpy).toHaveBeenCalledWith(commentId)
  })

  it('Should throw if CommentRepository.deleteComment throws', async () => {
    const { sut, deleteCommentRepository } = makeSut()
    jest
      .spyOn(deleteCommentRepository, 'deleteComment')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow()
  })

  it('Should throw CommentNotDeletedError if CommentRepository.deleteComment returns null', async () => {
    const { sut, deleteCommentRepository } = makeSut()
    jest
      .spyOn(deleteCommentRepository, 'deleteComment')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const promise = sut.deleteComment(fakeDeleteCommentParams())
    expect(promise).rejects.toThrow(new CommentNotDeletedError())
  })
})
