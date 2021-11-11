import { createServer, IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { LoggerAbstract as Logger } from '../interfaces/logger';

const MethodNames = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const MethodDefault = 'DEFAULT';

const MethodNamesList = Object.keys(MethodNames);

interface ServerArgs {
  port: number;
  logger: Logger;
}

type RouteCallback = (req: IncomingMessage, res: ServerResponse) => void;

interface RoutesMap {
  [key: string | typeof MethodDefault]: Map<string, RouteCallback>;
}

class Server {
  port: number;
  logger: Logger;
  routes: RoutesMap;
  server: any;

  constructor({port, logger}: ServerArgs) {
    this.port = port;
    this.logger = logger;

    this.routes = this._getSupportMethodNames();
    this._create();
    this._initDefaultErrorHandlers();
  }

  _initDefaultErrorHandlers(): void {
    process.on('uncaughtException', (error: Error, origin: string) => {
        this.logger.error(`Unexpected error: ${error.message}.`);
    });
    
    process.on('unhandledRejection', (reason: Error, promise: Promise<unknown>) => {
        this.logger.error(`Unhandled rejection: ${reason.message}.`);
    });
  }

  _getSupportMethodNames(): RoutesMap {
    return MethodNamesList.reduce((acc: RoutesMap, item: string) => {
      acc[item] = new Map();
      return acc;
    }, {
      [MethodDefault]: new Map(),
    });
  }

  _create() {
    this.server = createServer();
    this.server.on('request', (req: IncomingMessage, res: ServerResponse) => {
      const method = req?.method?.toUpperCase() ?? '';
      if (MethodNamesList.includes(method)) {
        this.callRoute(method, req, res);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          message: 'Hello not supported method'
        }));
      }
    });
    this.server.listen(this.port, () => this.logger.log(`Server is listening on port ${this.port}`));
  }

  _addRoute(method: string, route: string, callback: RouteCallback) {
    this.routes[method].set(route, callback);
  }

  callRoute(method: string, req: IncomingMessage, res: ServerResponse) {
    const reqUrl = url.parse(req.url || '', true);
    const route = reqUrl.pathname || '';
    const params = reqUrl.query;

    const hasUrl = this.routes[method].has(route);

    if (!hasUrl) {
      const callbackDefault = this.routes[MethodDefault].get('default')!;

      callbackDefault(req, res);
      this.logger.warn(JSON.stringify({
        method: req.method,
        url: req.url,
        params,
        desc: 'Was get  unsupported url',
      }));
      return;
    }

    const callback = this.routes[method].get(route)!;

    const chunks: Buffer[] = [];

    req
      .on('data', (data) => {
        chunks.push(data);
      })
      .on('end', () => {
        const body = Buffer.concat(chunks).toString();

        this.logger.log(JSON.stringify({
          method: req.method,
          url: req.url,
          params,
          desc: '',
          body,
        }));

        callback(req, res);
      });
  }

  get(route: string, callback: RouteCallback) {
    this._addRoute(MethodNames.GET, route, callback);
  }

  post(route: string, callback: RouteCallback) {
    this._addRoute(MethodNames.POST, route, callback);
  }

  patch(route: string, callback: RouteCallback) {
    this._addRoute(MethodNames.PATCH, route, callback);
  }

  delete(route: string, callback: RouteCallback) {
    this._addRoute(MethodNames.DELETE, route, callback);
  }

  default(callback: RouteCallback) {
    this.routes[MethodDefault].set('default', callback);
  }

  static init(params: ServerArgs) {
    return new Server(params);
  }
}

export default Server;
