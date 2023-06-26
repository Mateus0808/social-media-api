import { ApplicationError } from './application-error'

export class ToggleLikeError extends ApplicationError {
  constructor(message: string) {
    super(message)
    this.name = 'ToggleLikeError'
  }
}
