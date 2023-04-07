import { ApplicationError } from './application-error'

export class UserNotAuthorizedError extends ApplicationError {
  constructor() {
    super('Usuário não tem permissão')
    this.name = 'UserNotAuthorizedError'
  }
}
