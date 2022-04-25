export class InvalidParamsError extends Error {
  constructor () {
    super('Formulário com parametros inválidos, corrija e tente novamente')
    this.name = 'Erro'
  }
}
