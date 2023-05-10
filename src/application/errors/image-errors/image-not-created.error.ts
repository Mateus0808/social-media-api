import { ApplicationError } from '../application-error'

export class ImageNotCreatedError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = 'ImageNotCreatedError'
  }
}
