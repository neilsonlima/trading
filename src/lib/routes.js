module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Sinais' })
  })
  app.get('/magic', (req, res) => {
    res.render('magic', { title: 'MAGIC' })
  })
  app.get('/bb', (req, res) => {
    res.render('bb', { title: 'BB' })
  })
  app.get('/macd', (req, res) => {
    res.render('macd', { title: 'Macd' })
  })
  app.get('/bh', (req, res) => {
    res.render('bh', { title: 'Bot Hunter' })
  })
}
