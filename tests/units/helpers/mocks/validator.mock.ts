import { Validator } from '../../../../src/presentation/interfaces/validator'

export const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate(input: any): null | Error {
      return null
    }
  }
  return new ValidatorStub()
}
