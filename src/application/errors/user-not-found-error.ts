import { ApplicationError } from './application-error'

export class UsersNotFoundError extends ApplicationError {
  constructor () {
    super('Usuários não encontrados')
    this.name = 'UsersNotFoundError'
  }
}