export class InvalidHeaderError extends Error {
  constructor (param: string) {
    super(`Header ${param} inválido`)
    this.name = 'InvalidHeaderError'
  }
}
