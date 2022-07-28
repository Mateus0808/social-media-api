import { ValidatorComposite } from '../../../../../presentation/validators/validator-composite'
import { Validator } from '../../../../../presentation/interfaces/validator'
import { RequiredFieldValidator } from '../../../../../presentation/validators/required-field-validator'

export const makeUpdateUserInfoValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredRouteParams = ['userId']
  for (const param of requiredRouteParams) {
    validators.push(new RequiredFieldValidator(param))
  }
  return new ValidatorComposite(validators)
}
