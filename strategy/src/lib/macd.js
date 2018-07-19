const link_binance = ''
const link_trendingview = ''

const macd = (data) => {
  if(typeof(data) != 'undefined'){
    data.pop();
    let time = data[89][6];
    let pfch = Number(data[89][4]);
    data.pop();
    let last21_candle = data.slice(68);

    let ft = data.reduce( function(total, elem){ return total + Number(elem[4]) },0 );
    let ft2 = last21_candle.reduce( function(total, elem){ return total + Number(elem[4]) },0 );
    let macdp1 = ft / 89;
    let macdp2 = ft2 / 21;
    let macd1 = ((pfch - macdp1) * 0.0222) + macdp1;
    let macd2 = ((pfch - macdp2) * 0.0909) + macdp2;

    time = new Date(parseInt(time,10));

    if ((macd2 < pfch) && (macd2 > macd1) && (macd2 < (macd1 * 1.0015))) {
      obj = {symbol: symbol, volume: volume, count: count+1, time: time.toLocaleString()};
      console.log(obj);
    } else {
      obj = {symbol: symbol, volume: volume, count: 0, time: time.toLocaleString()};
      console.log(obj);
    }
  }
}

module.exports = macd
