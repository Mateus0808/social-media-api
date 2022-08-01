import { ApplicationError } from './application-error'

export class ErrorUpdatingUserName extends ApplicationError {
  constructor() {
    super('Erro ao atualizar nome do usuário')
    this.name = 'ErrorUpdatingUserName'
  }
}
