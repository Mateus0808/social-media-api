export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`Parâmetro ${param} inválido`)
    this.name = 'InvalidParamError'
  }
}
