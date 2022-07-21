import { Validator } from '../interfaces/validator'

export class ValidatorComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  validate(input: any): null | Error {
    this.validators.forEach(validator => {
      const error = validator.validate(input)
      if (error) {
        return error
      }
      return null
    })
    return null
  }
}
