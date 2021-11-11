import config from "./config";
import Logger from "./lib/logger";
import Server from "./lib/server";
import {IncomingMessage, ServerResponse } from 'http';

const app = Server.init({
  port: config.app_port,
  logger: new Logger(),
});

app.get('/', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello GET!'
  }));
});

app.post('/', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello POST!'
  }));
});

app.patch('/', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello PATCH!'
  }));
});

app.delete('/', (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'Hello DELETE!'
  }));
});

app.default((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: 'This url is not supported'
  }));
});
