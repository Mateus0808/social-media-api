import { ApplicationError } from './application-error'

export class FollowingUserError extends ApplicationError {
  constructor() {
    super('Não é possível seguir você mesmo')
    this.name = 'FollowingUserError'
  }
}
