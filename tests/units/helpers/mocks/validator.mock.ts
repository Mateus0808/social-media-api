import { Validator } from '../../../../src/presentation/interfaces/validator'

export const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate(): null | Error {
      return null
    }
  }
  return new ValidatorStub()
}
