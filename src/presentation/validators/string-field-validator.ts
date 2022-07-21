import { InvalidParamError } from '../errors/invalid-param-error'
import { Validator } from '../interfaces/validator'

export class StringFieldValidator implements Validator {
  private readonly fieldName: string

  constructor(fieldName: string) {
    this.fieldName = fieldName
  }

  validate(input: any): Error | null {
    if (input[this.fieldName] === undefined || input[this.fieldName] === null) {
      return null
    }
    if (typeof input[this.fieldName] !== 'string') {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
