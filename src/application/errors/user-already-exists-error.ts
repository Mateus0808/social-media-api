import { ApplicationError } from './application-error'

export class UserAlreadyExistsError extends ApplicationError {
  constructor(user: string) {
    super(`O usuário ${user} já existe`)
    this.name = 'UserAlreadyExistsError'
  }
}
