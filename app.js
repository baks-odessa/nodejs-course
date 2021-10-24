const config = require('./config');
const Server = require('./lib/server');
const Logger = require('./lib/logger');

const app = Server.init({
  port: config.app_port,
  logger: new Logger(),
});

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello GET!'
  }));
});

app.post('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello POST!'
  }));
});

app.patch('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello PATCH!'
  }));
});

app.delete('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello DELETE!'
  }));
});

app.default((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'This url is not supported'
  }));
});