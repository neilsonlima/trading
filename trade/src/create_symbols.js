const mongoose = require('mongoose')
const Symbol = require('./model/candlestick')
const fs = require('fs'); 


mongoose.connect('mongodb://localhost/binance', function (err){
  if (err) throw err;
})

Symbol.find({}, (err, docs)=>{
    if(err) throw err
    let symbol = docs.map((elem)=>{return elem.symbol})
    let txt = 'module.exports = { symbols: ' + JSON.stringify(symbol) +'}'
    fs.writeFile('src/symbols.js', txt, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    mongoose.disconnect()
})


