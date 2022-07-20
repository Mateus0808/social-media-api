import { ApplicationError } from './application-error'

export class UserNotCreatedError extends ApplicationError {
  constructor (user: string) {
    super(`Não foi possível criar o usuário ${user}`)
    this.name = 'UserNotCreatedError'
  }
}
