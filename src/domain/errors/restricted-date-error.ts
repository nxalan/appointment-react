export class RestrictedDateError extends Error {
  constructor () {
    super('A data escolhida para o agendamento já está cheia')
    this.name = 'RestrictedDateError'
  }
}
