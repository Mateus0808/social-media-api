import { ApplicationError } from './application-error'

export class UserNotExistsError extends ApplicationError {
  constructor (user: string) {
    super(`Usuário ${user} inexistente`)
    this.name = 'UserNotExistsError'
  }
}