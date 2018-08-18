'use strict'

const magic = docs => {
  let result = []
  try {
    docs.forEach(doc => {
      if (doc.prices.length >= 10) {
        let prices = doc.prices.slice(-10)
        let percent = 0.5

        let f1 = Number(prices[0].price)
        let f9 = Number(prices[8].price)
        let f10 = Number(prices[9].price)
        let str = prices[9].f
        let time = prices[9].t

        let ft = prices.reduce((t, v, i, a) => {
          return t + Number(a[i].price)
        }, 0)
        let mft = ft / 10

        time = new Date(parseInt(time, 10))

        if (mft >= f1 + (percent / 100) * f1 && f10 >= f9) {
          console.log({
            symbol: doc.symbol,
            percent: percent,
            volume: doc.volume,
            last_price: str,
            time: time.toLocaleString()
          })
          result.push({
            symbol: doc.symbol,
            percent: percent,
            volume: doc.volume,
            last_price: str,
            time: time.toLocaleString()
          })
        }
      }
    })
    return result
  } catch (error) {
    throw error
  }
}

module.exports = magic
