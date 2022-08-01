export class MissingHeaderError extends Error {
  constructor(param: string) {
    super(`Header ${param} não informado`)
    this.name = 'MissingHeaderError'
  }
}
