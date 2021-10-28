const http = require('http');
const url = require('url');

const MethodNames = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const MethodDefault = 'DEFAULT';

const MethodNamesList = Object.keys(MethodNames);

class Server {
  constructor(params) {
    this.port = params.port;
    this.logger = params.logger;

    this.routes = this._getSupportMethodNames();
    this._create();
  }

  _getSupportMethodNames() {
    return MethodNamesList.reduce((acc, item) => {
      acc[item] = new Map();
      return acc;
    }, {
      [MethodDefault]: new Map(),
    });
  }

  _create() {
    this.server = http.createServer();
    this.server.on('request', (req, res) => {
      const method = req.method.toUpperCase();
      if (MethodNamesList.includes(method)) {
        this.callRoute(method, req, res);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          message: 'Hello not supported method'
        }));
      }
    });
    this.server.listen(this.port, () => this.logger.log('Server is listening on port ', this.port));
  }

  _addRoute(method, route, callback) {
    this.routes[method].set(route, callback);
  }

  callRoute(method, req, res) {
    const reqUrl = url.parse(req.url, true);
    const route = reqUrl.pathname;

    const hasUrl = this.routes[method].has(route);

    if (!hasUrl) {
      this.routes[MethodDefault].get('default')(req, res);
      return;
    }

    const callback = this.routes[method].get(route);
    callback(req, res);
  }

  get(route, callback) {
    this._addRoute(MethodNames.GET, route, callback);
  }

  post(route, callback) {
    this._addRoute(MethodNames.POST, route, callback);
  }

  patch(route, callback) {
    this._addRoute(MethodNames.PATCH, route, callback);
  }

  delete(route, callback) {
    this._addRoute(MethodNames.DELETE, route, callback);
  }

  default(callback) {
    this.routes[MethodDefault].set('default', callback);
  }

  static init(params) {
    return new Server(params);
  }
}

module.exports = Server;
