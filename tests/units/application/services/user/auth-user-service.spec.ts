import {
  AuthUserParams,
  AuthUserResponse,
} from '../../../../../src/application/interfaces/user-interface/auth-user-service-interface'
import { AuthUserService } from '../../../../../src/application/services/user-services/auth-user-service'
import { Encrypter } from '../../../../../src/application/ports/encrypter/encrypter'
import { HashComparer } from '../../../../../src/application/ports/hasher/hasher'
import { LoadUserByEmailRepositoryInterface } from '../../../../../src/application/ports/repositories/user/load-user-by-email-repository-interface'
import { userCreatedDto } from '../../../../../src/application/helpers/user-dto'
import {
  fakeUser,
  fakeUserDbModel,
} from '../../../helpers/fake-datas/fake-user-data'
import { UserDbModel } from '../../../../../src/application/ports/repositories/models/user-model'
import { UserNotExistsError } from '../../../../../src/application/errors/user-not-exists-error'
import { IncorrectPasswordError } from '../../../../../src/application/errors/incorrect-password-error'

const fakeAuthUserParams = (): AuthUserParams => ({
  email: 'any_email@email.com',
  password: 'any_password',
})

const fakeAuthUserResponse = (): AuthUserResponse => ({
  user: userCreatedDto(fakeUserDbModel()),
  token: 'any_token',
})

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hashToCompare: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(data: any): Promise<string> {
      return new Promise<string>(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

const makeLoadUserByEmailRepository =
  (): LoadUserByEmailRepositoryInterface => {
    class LoadUserByEmailRepositoryStub
      implements LoadUserByEmailRepositoryInterface
    {
      async loadByEmail(email: string): Promise<UserDbModel | null> {
        return new Promise(resolve => resolve(fakeUserDbModel()))
      }
    }
    return new LoadUserByEmailRepositoryStub()
  }

interface SutTypes {
  sut: AuthUserService
  hashComparer: HashComparer
  encrypter: Encrypter
  loadUserByEmailRepository: LoadUserByEmailRepositoryInterface
}

const makeSut = (): SutTypes => {
  const hashComparer = makeHashComparer()
  const encrypter = makeEncrypter()
  const loadUserByEmailRepository = makeLoadUserByEmailRepository()
  const sut = new AuthUserService(
    hashComparer,
    encrypter,
    loadUserByEmailRepository,
  )
  return {
    sut,
    hashComparer,
    encrypter,
    loadUserByEmailRepository,
  }
}

describe('AuthUserService - Integrations with dependencies', () => {
  it('Should call LoadUserByEmailRepository.loadByEmail with correct param', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, 'loadByEmail')
    await sut.auth(fakeAuthUserParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith(fakeAuthUserParams().email)
  })

  it('Should throw an error UserNotExistsError if LoadUserByEmailRepository.loadByEmail returns null', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest
      .spyOn(loadUserByEmailRepository, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.auth(fakeAuthUserParams())
    expect(promise).rejects.toThrow(
      new UserNotExistsError(fakeAuthUserParams().email),
    )
  })

  it('Should call HashComparer.compare with correct parameters', async () => {
    const { sut, hashComparer } = makeSut()
    const hashCompareSpyOn = jest.spyOn(hashComparer, 'compare')
    await sut.auth(fakeAuthUserParams())
    expect(hashCompareSpyOn).toHaveBeenCalledWith(
      fakeAuthUserParams().password,
      fakeUserDbModel().password,
    )
  })

  it('Should throw an error if HashComparer.compare throws', async () => {
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      }),
    )
    const promise = sut.auth(fakeAuthUserParams())
    expect(promise).rejects.toThrow()
  })

  it('Should throw IncorrectPasswordError if HashComparer.compare returns false', async () => {
    const { sut, hashComparer } = makeSut()
    jest
      .spyOn(hashComparer, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const promise = sut.auth(fakeAuthUserParams())
    expect(promise).rejects.toThrow(new IncorrectPasswordError())
  })

  it('Should call Encrypter.encrypt with correct parameter', async () => {
    const { sut, encrypter } = makeSut()
    const encrypterSpyOn = jest.spyOn(encrypter, 'encrypt')
    await sut.auth(fakeAuthUserParams())
    expect(encrypterSpyOn).toHaveBeenCalledWith({
      id: fakeUserDbModel().id,
    })
  })

  it('Should throw an error if Encrypter.encrypt throws', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      }),
    )
    const promise = sut.auth(fakeAuthUserParams())
    expect(promise).rejects.toThrow()
  })
})

describe('AuthUserService - Success case', () => {
  it('Should return an user and a token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.auth(fakeAuthUserParams())
    expect(response).toEqual(fakeAuthUserResponse())
  })
})
