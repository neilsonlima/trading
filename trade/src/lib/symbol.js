const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"
const mail = require('./mail')

const my_to = 'Name<seuemail@x>'

const init = (response) => {
  let data = []
  for(let elem in response){
    if(response[elem].symbol.includes('BTC')){
      data.push({
        'symbol': response[elem].symbol,
        'volume': Number(response[elem].quoteVolume)
      });
    }
  }
  if(data) find_and_modify(data)
}
const find_and_modify =  (data) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    let dbo = db.db("binance")
    if (err) throw err
    for(let elem in data){
      dbo.collection('candlesticks').findAndModify(
        {'symbol': data[elem].symbol},
        [['_id','asc']],
        {$set: {'volume': data[elem].volume}},
        {'upsert':true}, function(err, records){
          if(err){
            console.warn("[ERROR] " + err.message)
          } else {
            if(!records.lastErrorObject.updatedExisting){
              const newLocal = `<p>${data[elem].symbol}</p>`
              mail.send(my_to, 'Nova Moeda: ' + data[elem].symbol, newLocal)
            }
          }
        }
      );
    }
    db.close()
  });
}

module.exports = init
