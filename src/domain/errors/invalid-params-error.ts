export class InvalidParamsError extends Error {
  constructor () {
    super('Digite um valor válido')
    this.name = 'InvalidParamsError'
  }
}
