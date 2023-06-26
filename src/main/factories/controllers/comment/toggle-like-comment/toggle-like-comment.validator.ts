import { Validator } from '../../../../../presentation/interfaces/validator'
import { RequiredFieldValidator } from '../../../../../presentation/validators/required-field-validator'
import { StringFieldValidator } from '../../../../../presentation/validators/string-field-validator'
import { ValidatorComposite } from '../../../../../presentation/validators/validator-composite'

export const makeToggleLikeCommentValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const params = ['userId', 'postId', 'commentId']
  for (const param of params) {
    validators.push(new RequiredFieldValidator(param))
    validators.push(new StringFieldValidator(param))
  }
  return new ValidatorComposite(validators)
}