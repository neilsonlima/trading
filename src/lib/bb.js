'use strict'

const bb = docs => {
  let result = []
  try {
    docs.forEach(doc => {
      if (doc.prices.length >= 20) {
        let prices = doc.prices.slice(-20)

        let time = prices[19].t
        let f = Number(prices[19].price)
        let str = prices[19].f

        let ft = prices.reduce((t, v, i, a) => {
          return t + Number(a[i].price)
        }, 0)

        let fch = prices.map(elem => {
          return Number(elem.price)
        })

        let mm = ft / 20

        time = new Date(parseInt(time, 10))

        let va =
          fch.reduce(function (sum, elem) {
            return sum + (elem - mm) ** 2
          }, 0) / 20

        let dp = Math.sqrt(va)

        let b = mm - dp * 3

        if (f < b) {
          console.log({
            symbol: doc.symbol,
            volume: doc.volume,
            last_price: str,
            time: time.toLocaleString()
          })
          result.push({
            symbol: doc.symbol,
            volume: doc.volume,
            last_price: str,
            time: time.toLocaleString()
          })
        }
      }
    })
    return result
  } catch (err) {
    throw err
  }
}

module.exports = bb
