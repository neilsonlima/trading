const mongoose = require('mongoose')
const binance = require('node-binance-api')
const symbols = require('./symbols')
const Candlesticks = require('./model/candlestick')

binance.options({ reconnect: true })

mongoose.connect(
  'mongodb://localhost/binance',
  function (err) {
    if (err) throw err
  }
)

const coins = {
  alts: [],
  kline: function () {
    console.log('[Coletor] inicializado!')
    binance.websockets.candlesticks(
      symbols.symbols,
      '1m',
      candlesticks => {
        this.processAlts(candlesticks)
      },
      { limit: 1 }
    )
  },
  processAlts: function (candlesticks) {
    let { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks
    let {
      o: open,
      h: high,
      l: low,
      c: close,
      v: volume,
      n: trades,
      i: interval,
      x: isFinal,
      q: quoteVolume,
      V: buyVolume,
      Q: quoteBuyVolume,
      t: startTime,
      T: closeTime
    } = ticks

    if (symbol in this.alts) {
      if (this.alts[symbol]['t'] != startTime) {
        let my_close = Number(this.alts[symbol]['prices']['c'])
        let price_str = this.alts[symbol]['prices']['c']

        Candlesticks.findOne({ symbol: symbol }, (err, obj) => {
          if (err) throw err

          // Se obj for null cria um novo doc, senão atualiza
          if (obj == null) {
            let candlesticks = new Candlesticks()

            candlesticks._id = new mongoose.Types.ObjectId()
            candlesticks.symbol = symbol
            candlesticks.prices.push({
              price: my_close,
              t: this.alts[symbol]['T'],
              f: price_str
            })
            candlesticks.save(function (err) {
              if (err) throw err
            })
          } else {
            obj.prices.push({
              price: my_close,
              t: this.alts[symbol]['T'],
              f: price_str
            })
            if (obj.prices.length == 91) {
              obj.prices.shift()
            }
            Candlesticks.update(
              { _id: obj.id },
              { $set: { prices: obj.prices } },
              (err, doc) => {
                if (err) throw err
              }
            )
          }
        })
      }
      this.alts[symbol] = {
        symbol: symbol,
        t: startTime,
        T: closeTime,
        prices: { o: open, c: close }
      }
    } else {
      this.alts[symbol] = {
        symbol: symbol,
        t: startTime,
        T: closeTime,
        prices: { o: open, c: close }
      }
    }
  }
}

// coins.kline()
module.exports = coins
