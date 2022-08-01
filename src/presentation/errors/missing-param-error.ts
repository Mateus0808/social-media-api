export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Parâmetro ${param} não informado`)
    this.name = 'MissingParamError'
  }
}
