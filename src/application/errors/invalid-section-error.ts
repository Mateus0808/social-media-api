import { ApplicationError } from './application-error'

export class InvalidSectionError extends ApplicationError {
  constructor() {
    super('Seção inválida')
    this.name = 'InvalidSectionError'
  }
}
