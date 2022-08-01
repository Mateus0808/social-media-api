import { ApplicationError } from './application-error'

export class ErrorUpdatingUserUsername extends ApplicationError {
  constructor() {
    super('Erro ao atualizar username do usuário')
    this.name = 'ErrorUpdatingUserUsername'
  }
}
