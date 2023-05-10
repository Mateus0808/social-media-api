import { ApplicationError } from '../application-error'

export class ImageNotUpdatedError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = 'ImageNotUpdatedError'
  }
}
