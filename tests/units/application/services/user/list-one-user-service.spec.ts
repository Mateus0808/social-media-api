import { GetUserByIdService } from './../../../../../src/application/services/user-services/get-user-by-id.service'
import { UserDbModel } from '../../../../../src/application/ports/repositories/models/user-model'
import { fakeUserDbModel } from '../../../helpers/fake-datas/fake-user-data'
import { LoadUserByIdRepositoryInterface } from '../../../../../src/application/ports/repositories/user/load-user-by-id-repository-interface'
import { UserNotFoundError } from '../../../../../src/application/errors/user-not-found-error'
import { userDto } from '../../../../../src/application/helpers/user-dto'

const makeLoadUserByIdRepository = (): LoadUserByIdRepositoryInterface => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepositoryInterface {
    async loadById(id: string): Promise<UserDbModel | null> {
      return new Promise(resolve => resolve(fakeUserDbModel()))
    }
  }
  return new LoadUserByIdRepositoryStub()
}

interface SutTypes {
  sut: GetUserByIdService
  loadUserByIdRepository: LoadUserByIdRepositoryInterface
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepository = makeLoadUserByIdRepository()
  const sut = new GetUserByIdService(loadUserByIdRepository)
  return {
    sut,
    loadUserByIdRepository,
  }
}

describe('GetUserByIdService - Integration with dependencies', () => {
  it('Should call LoadUserByIdRepository.loadById with correct params', async () => {
    const { sut, loadUserByIdRepository } = makeSut()
    const loadUserByIdRepositorySpy = jest.spyOn(
      loadUserByIdRepository,
      'loadById',
    )

    await sut.getUserById({ userId: 'any_id' })
    expect(loadUserByIdRepositorySpy).toHaveBeenCalledTimes(1)
    expect(loadUserByIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })

  it('Should throw UserNotFoundError if LoadUserByIdRepository.loadById returns null', async () => {
    const { sut, loadUserByIdRepository } = makeSut()
    jest
      .spyOn(loadUserByIdRepository, 'loadById')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const promise = sut.getUserById({ userId: 'any_id' })
    expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  it('Should throw an error if LoadUserByIdRepository.loadById throws', async () => {
    const { sut, loadUserByIdRepository } = makeSut()
    jest
      .spyOn(loadUserByIdRepository, 'loadById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.getUserById({ userId: 'any_id' })
    expect(promise).rejects.toThrow()
  })
})

describe('GetUserByIdService - Success case', () => {
  it('Should return an userDto if LoadUserByIdRepository.loadById succeeds', async () => {
    const { sut } = makeSut()
    const promise = await sut.getUserById({ userId: 'any_id' })
    expect(promise).toEqual(userDto(fakeUserDbModel()))
  })
})
