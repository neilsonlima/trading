const WebSocket = require('ws')
const mongoose = require('mongoose')
const port = process.env.PORT || 8081
const wss = new WebSocket.Server({ port: port })
let url = 'mongodb://localhost/binance'
mongoose.connect(
  url,
  err => {
    if (err) throw err
  }
)
const list_tokens_signal = [
  '8b87ce72bbdb4f87fab8064f117fd5e2', // strategy
  'd0a78ac60c79c078b5dafe677158adf4' // bh
]
const sockets = {}

const key_magic = 'magic'
const key_bb = 'bb'
const key_macd = 'macd'
const key_rsi = 'rsi'
const key_bh = 'bh'

const roomsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, index: true, required: true },
  key: { type: String, index: true, unique: true, required: true },
  created: {
    type: Date,
    default: Date.now
  }
})
const Rooms = mongoose.model('Rooms', roomsSchema)
Rooms.remove({}, function (err) {
  if (err) throw err
})

function noop () {}

function heartbeat () {
  this.isAlive = true
}

wss.on('connection', function connection (ws, req) {
  ws.isAlive = true
  ws.on('pong', heartbeat)

  let id = req.headers['sec-websocket-key']
  let protocols = req.headers['sec-websocket-protocol'].split(', ')
  ws['user_id'] = id
  sockets[id] = ws

  let room = protocols[0]
  let token = protocols[1]
  if (!list_tokens_signal.includes(token)) {
    let r = new Rooms()

    r._id = new mongoose.Types.ObjectId()
    r.name = room
    r.key = id

    r.save(function (err) {
      if (err) throw err
      console.log('cliente: ' + id + ' entrou na sala: ' + room)
    })
  }

  ws.on('close', () => {
    if (!list_tokens_signal.includes(token)) {
      Rooms.findOneAndRemove({ key: id }, function (err, r) {
        if (err) throw err
        console.log('cliente: ' + id + ' saiu da sala: ' + room)
      })
      delete sockets[id]
    }
  })

  ws.on('message', function incoming (data) {
    json = JSON.parse(data)
    const enviar = (key, elem) => {
      Rooms.find({ name: key }, function (err, records) {
        if (err) throw err
        records.forEach(function each (record) {
          sockets[record.key].send(JSON.stringify(elem))
        })
      })
    }

    json.forEach(element => {
      if (key_bb in element) {
        enviar(key_bb, element)
      } else if (key_magic in element) {
        enviar(key_magic, element)
      } else if (key_bh in element) {
        enviar(key_bh, element)
      } else if (key_macd in element) {
        enviar(key_macd, element)
      } else if (key_rsi in element) {
        enviar(key_rsi, element)
      }
    })
  })
})

const interval = setInterval(function ping () {
  wss.clients.forEach(function each (ws) {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    ws.ping(noop)
  })
}, 30000)
