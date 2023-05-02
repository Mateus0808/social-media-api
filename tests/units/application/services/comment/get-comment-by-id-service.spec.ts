import { GetCommentByIdRepositoryInterface } from '../../../../../src/application/ports/repositories/comment/get-comment-by-id-repository-interface'
import { GetCommentByIdService } from '../../../../../src/application/services/comment-services/get-comment-by-id-service'
import { CommentDbModel } from '../../../../../src/application/ports/repositories/models/comment-model'
import { fakeDbComment } from '../../../helpers/fake-datas/fake-comment-data'
import { CommentNotFoundError } from '../../../../../src/application/errors/comment-errors/comment-not-found-error'

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

interface SutTypes {
  sut: GetCommentByIdService
  getCommentByIdRepository: GetCommentByIdRepositoryInterface
}

const makeSut = (): SutTypes => {
  const getCommentByIdRepository = makeGetCommentByIdRepository()
  const sut = new GetCommentByIdService(getCommentByIdRepository)
  return {
    sut,
    getCommentByIdRepository,
  }
}

describe('GetCommentByIdService - Integration with dependencies', () => {
  it('Should call CommentRepository.getCommentById with correct parameters', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    const getCommentByIdSpy = jest.spyOn(
      getCommentByIdRepository,
      'getCommentById',
    )
    await sut.getCommentById('any_comment_id')
    expect(getCommentByIdSpy).toHaveBeenCalledTimes(1)
    expect(getCommentByIdSpy).toHaveBeenCalledWith('any_comment_id')
  })

  it('Should throw CommentNotFoundError if CommentRepository.getCommentById returns null', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    jest
      .spyOn(getCommentByIdRepository, 'getCommentById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const promise = sut.getCommentById('any_comment_id')
    expect(promise).rejects.toThrow(new CommentNotFoundError())
  })

  it('Should throw an error if CommentRepository.getCommentById throws', async () => {
    const { sut, getCommentByIdRepository } = makeSut()
    jest
      .spyOn(getCommentByIdRepository, 'getCommentById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.getCommentById('any_comment_id')
    expect(promise).rejects.toThrow()
  })
})
