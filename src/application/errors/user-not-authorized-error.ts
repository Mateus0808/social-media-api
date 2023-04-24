import { ApplicationError } from './application-error'

export class UserNotAuthorizedError extends ApplicationError {
  constructor() {
    super('Usuário não autorizado')
    this.name = 'UserNotAuthorizedError'
  }
}
