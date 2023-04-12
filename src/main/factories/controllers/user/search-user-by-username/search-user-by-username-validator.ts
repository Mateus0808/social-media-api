import { Validator } from '@presentation/interfaces/validator'
import { RequiredFieldValidator } from '@presentation/validators/required-field-validator'
import { ValidatorComposite } from '@presentation/validators/validator-composite'

export const makeSearchUserByUsernameValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredRouteParams = ['userId']
  for (const param of requiredRouteParams) {
    validators.push(new RequiredFieldValidator(param))
  }
  return new ValidatorComposite(validators)
}
