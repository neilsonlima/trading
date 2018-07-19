const CronJob = require('cron').CronJob
const WebSocket = require('ws');
const Candlesticks = require('./model/candlestick')
const mongoose = require('mongoose')
const magic = require('./lib/magic')
const bb = require('./lib/bb')

var connection = new WebSocket('ws://localhost:8080', ['strategy','8b87ce72bbdb4f87fab8064f117fd5e2'])

mongoose.connect('mongodb://localhost/binance', function (err){
  if (err) throw err;
})

const strategy = () => {
  return new Promise(function(resolve, reject){
    let result = {}
    try {
      Candlesticks.find({volume: {$gte: 500}}, (err, docs)=>{
        if(err) throw err
        //console.log(docs)
        result['magic'] = magic(docs)
        result['bb'] = bb(docs)

        resolve(result)

      })
    } catch (err) {
      reject(err)
    }
  })
}

const sendSignals = (response) => {
  let sinais = []
  if(response.magic.length>0){
    sinais.push({magic: response.magic})
  }
  if(response.bb.length>0){
    sinais.push({bb: response.bb})
  }
  if(sinais.length >0){
    connection.send(JSON.stringify(sinais));
  }
  console.log(response)
}

const job = new CronJob('0 * * * * *', () => {
  strategy()
    .then((response) => sendSignals(response))
    .catch((err) => { console.log })
}, null, true, 'America/Sao_Paulo')
