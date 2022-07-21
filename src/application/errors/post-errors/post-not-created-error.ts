import { ApplicationError } from '../application-error'

export class PostNotCreatedError extends ApplicationError {
  constructor(postTitle: string) {
    super(`Não foi possível criar o post ${postTitle}`)
    this.name = 'PostNotCreatedError'
  }
}
