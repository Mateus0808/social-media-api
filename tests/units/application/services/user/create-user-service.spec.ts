import { UserAlreadyExistsError } from '../../../../../src/application/errors/user-already-exists-error'
import { CreateUserService } from '../../../../../src/application/services/user-services/create-user-service'
import { LoadUserByEmailRepositoryInterface } from '../../../../../src/application/ports/repositories/user/load-user-by-email-repository-interface'
import { Hasher } from '../../../../../src/application/ports/hasher/hasher'
import {
  CreateUserRepositoryInterface,
  CreateUserRepositoryParams,
} from '../../../../../src/application/ports/repositories/user/create-user-repository-interface'
import { CreateUserParams } from '../../../../../src/application/interfaces/user-interface/create-user-service-interface'
import {
  CreatedUserModel,
  UserDbModel,
} from '../../../../../src/application/ports/repositories/models/user-model'
import {
  fakeCreateUserDbModel,
  fakeUserDbModel,
} from '../../../helpers/fake-datas/fake-user-data'
import { UserNotCreatedError } from '../../../../../src/application/errors/user-not-created-error'
import { EnumAccountStatus } from '../../../../../src/application/ports/repositories/models/enum-account-status'

const fakeCreateUserParams = (): CreateUserParams => ({
  email: 'any_email@email.com',
  name: 'any_name',
  phone: '99999999999',
  birthDate: '09/04/2009',
  lastName: 'any_lastName',
  gender: 'MALE',
  maritalStatus: 'any_maritalStatus',
  password: '12345',
})

const fakeCreateUserRepositoryParams = (): CreateUserRepositoryParams => ({
  email: 'any_email@email.com',
  name: 'Any_name',
  phone: '99999999999',
  username: '',
  birthDate: new Date('09/04/2009'),
  lastName: 'Any_lastName',
  gender: 'MALE',
  maritalStatus: 'any_maritalStatus',
  password: 'hashed_password',
  status: EnumAccountStatus.Active,
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeCreateUserRepository = (): CreateUserRepositoryInterface => {
  class CreateUserRepositoryStub implements CreateUserRepositoryInterface {
    async createUser(
      createUserRepositoryParams: CreateUserRepositoryParams,
    ): Promise<CreatedUserModel | null> {
      return new Promise(resolve => resolve(fakeCreateUserDbModel()))
    }
  }
  return new CreateUserRepositoryStub()
}

const makeLoadUserByEmailRepository =
  (): LoadUserByEmailRepositoryInterface => {
    class LoadUserByEmailRepositoryStub
      implements LoadUserByEmailRepositoryInterface
    {
      async loadByEmail(email: string): Promise<UserDbModel | null> {
        return new Promise(resolve => resolve(null))
      }
    }
    return new LoadUserByEmailRepositoryStub()
  }

interface SutTypes {
  sut: CreateUserService
  hasher: Hasher
  createUserRepository: CreateUserRepositoryInterface
  loadUserByEmailRepository: LoadUserByEmailRepositoryInterface
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepository = makeLoadUserByEmailRepository()
  const createUserRepository = makeCreateUserRepository()
  const hasher = makeHasher()
  const sut = new CreateUserService(
    hasher,
    createUserRepository,
    loadUserByEmailRepository,
  )
  return {
    sut,
    hasher,
    createUserRepository,
    loadUserByEmailRepository,
  }
}

describe('CreateUserService - Integrations with dependencies', () => {
  it('Should call LoadUserByEmailRepository.loadByEmail with correct param', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, 'loadByEmail')
    await sut.createUser(fakeCreateUserParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith(fakeCreateUserParams().email)
  })

  it('Should throw if LoadUserByEmailRepository.loadByEmail throws', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest
      .spyOn(loadUserByEmailRepository, 'loadByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.createUser(fakeCreateUserParams())
    expect(promise).rejects.toThrow()
  })

  it('Should throw an error UserAlreadyExistsError if LoadUserByEmailRepository.loadByEmail returns an user', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest
      .spyOn(loadUserByEmailRepository, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(fakeUserDbModel())))

    const promise = sut.createUser(fakeCreateUserParams())
    expect(promise).rejects.toThrow(
      new UserAlreadyExistsError(fakeCreateUserParams().email),
    )
  })

  it('Should call Hasher.hash with correct param', async () => {
    const { sut, hasher } = makeSut()
    const passwordDefault = '12345'
    const hashSpy = jest.spyOn(hasher, 'hash')
    await sut.createUser(fakeCreateUserParams())
    expect(hashSpy).toHaveBeenCalledWith(passwordDefault)
  })

  it('Should throw if Hasher.hash throws', () => {
    const { sut, hasher } = makeSut()
    jest
      .spyOn(hasher, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const promise = sut.createUser(fakeCreateUserParams())
    expect(promise).rejects.toThrow()
  })

  it('Should call CreateUserRepository.createUser with correct params', async () => {
    const { sut, createUserRepository } = makeSut()
    const createUserRepositorySpy = jest.spyOn(
      createUserRepository,
      'createUser',
    )
    await sut.createUser(fakeCreateUserParams())
    expect(createUserRepositorySpy).toHaveBeenCalledWith(
      fakeCreateUserRepositoryParams(),
    )
  })

  it('Should throw an error if CreateUserRepository.createUser throws', async () => {
    const { sut, createUserRepository } = makeSut()
    jest
      .spyOn(createUserRepository, 'createUser')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.createUser(fakeCreateUserParams())
    expect(promise).rejects.toThrow(
      new UserNotCreatedError(fakeCreateUserParams().email),
    )
  })
})
