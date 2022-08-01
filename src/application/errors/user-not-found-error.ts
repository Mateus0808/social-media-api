import { ApplicationError } from './application-error'

export class UserNotFoundError extends ApplicationError {
  constructor() {
    super('Usuário não encontrado')
    this.name = 'UserNotFoundError'
  }
}
