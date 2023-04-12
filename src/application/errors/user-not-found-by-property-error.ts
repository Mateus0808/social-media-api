import { ApplicationError } from './application-error'

export class UserNotFoundByPropertyError extends ApplicationError {
  constructor(property: string) {
    super(`Usuário não encontrado - ${property}`)
    this.name = 'UserNotFoundByPropertyError'
  }
}
