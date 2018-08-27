const express = require('express')
const app = express()
const volume = require('./volume')
const candlesticks = require('./candlesticks')
const server = require('./server')
const strategy = require('./strategy')

// inicia os coletores
volume.start()
candlesticks.kline()
strategy.start()

app.set('view engine', 'pug')
app.set('views', './src/views')

require('./lib/routes')(app)

app.listen(3000, function () {
  console.log('Listing on port 3000')
})
