import { ApplicationError } from '../application-error'

export class ToggleLikePostError extends ApplicationError {
  constructor() {
    super('Erro ao atualizar like na postagem')
    this.name = 'ToggleLikePostError'
  }
}
