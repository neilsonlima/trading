const CronJob = require('cron').CronJob
const rp = require('request-promise')
const symbol = require('./lib/symbol')

module.exports = {
  start: function () {
    console.log('[Volume] inicializado!')
    const obj = new CronJob(
      '0 * * * * *',
      () => {
        let options = {
          uri: 'https://api.binance.com/api/v1/ticker/24hr',
          headers: {
            'User-Agente': 'Request-Promise'
          },
          json: true
        }

        rp(options)
          .then(symbol)
          .catch(err => {
            console.log(err)
          })
      },
      null,
      true,
      'America/Sao_Paulo'
    )
  }
}
