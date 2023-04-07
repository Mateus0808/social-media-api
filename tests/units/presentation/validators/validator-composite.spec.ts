import { ValidatorComposite } from '../../../../src/presentation/validators/validator-composite'
import { Validator } from '../../../../src/presentation/interfaces/validator'
import { MissingParamError } from '../../../../src/presentation/errors/missing-param-error'
import { InvalidParamError } from '../../../../src/presentation/errors/invalid-param-error'

const makeValidator = (): Validator => {
  class FakeValidatorStub implements Validator {
    validate(input: any): Error | null {
      return null
    }
  }
  return new FakeValidatorStub()
}

const fakeValidators = (): Validator[] => [makeValidator(), makeValidator()]

interface SutTypes {
  sut: ValidatorComposite
  validatorsStub: Validator[]
}

const makeSut = (): SutTypes => {
  const validatorsStub = fakeValidators()
  const sut = new ValidatorComposite(validatorsStub)
  return {
    sut,
    validatorsStub,
  }
}

describe('ValidatorComposite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validatorsStub } = makeSut()
    jest
      .spyOn(validatorsStub[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should return the first error if more then validation fails', () => {
    const { sut, validatorsStub } = makeSut()
    jest
      .spyOn(validatorsStub[0], 'validate')
      .mockReturnValueOnce(new InvalidParamError('name'))
    jest
      .spyOn(validatorsStub[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('name'))
  })

  it('Should return null if the validations succeed', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeNull()
  })
})
