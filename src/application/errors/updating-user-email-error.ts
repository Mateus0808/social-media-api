import { ApplicationError } from './application-error'

export class ErrorUpdatingUserEmail extends ApplicationError {
  constructor() {
    super('Erro ao atualizar e-mail')
    this.name = 'ErrorUpdatingUserEmail'
  }
}
