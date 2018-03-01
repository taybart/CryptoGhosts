const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressWinston = require('express-winston');
const MongoClient = require('mongodb').MongoClient;
const EventEmitter = require('events');
const socketio = require('socket.io');
const http = require('http');
const config = require('./config.json');
const log = require('./log');
const ghosts = require('./ghosts');
const items = require('./items');
const battle = require('./battle');


const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());

app.use(expressWinston.logger({
  winstonInstance: log,
  meta: false,
  colorize: true,
}));

const ee = new EventEmitter();

MongoClient.connect(config.db.url, (err, client) => {
  log.info('Connected to mongo');
  const ghostCol = client.db(config.db.name).collection('ghosts');
  const itemCol = client.db(config.db.name).collection('items');
  const battleCol = client.db(config.db.name).collection('battles');

  app.get('/', (req, res) => {
    res.json({ status: 'OK', msg: 'Hello World!' });
  });
  ghosts(app, ghostCol, itemCol);
  items(app, ghostCol, itemCol);
  battle(app, ghostCol, battleCol, ee, io);

  server.listen(config.express.port, () => log.info(`Cryptoghosts API listening on port ${config.express.port}!`));
});
