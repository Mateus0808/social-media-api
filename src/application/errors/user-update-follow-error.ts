import { ApplicationError } from './application-error'

export class UserUpdateFollowError extends ApplicationError {
  constructor() {
    super('Erro ao atualizar seguidor')
    this.name = 'UserUpdateFollowError'
  }
}
