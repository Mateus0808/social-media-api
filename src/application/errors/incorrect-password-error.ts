import { ApplicationError } from './application-error'

export class IncorrectPasswordError extends ApplicationError {
  constructor () {
    super('Senha incorreta')
    this.name = 'IncorrectPasswordError'
  }
}