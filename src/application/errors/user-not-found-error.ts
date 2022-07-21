import { ApplicationError } from './application-error'

export class UsersNotFoundError extends ApplicationError {
  constructor() {
    super('Usuário não encontrado')
    this.name = 'UserNotFoundError'
  }
}
