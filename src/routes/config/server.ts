import express, { Express } from "express";
import config from "@/config";

import https from "https";
import { error404, errorMiddleware } from "@/routes/config/error";

// Exports

export default createServer;

// -------

class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  private onReady(https: boolean = false) {
    const s = https ? "s" : "";

    console.clear();
    console.log(
      `[🚀] Server ready at http${s}://localhost:${config.server.port}\n`
    );
  }

  private sslExists() {
    return (
      config.server.ssl_cert != undefined && config.server.ssl_key != undefined
    );
  }

  public start() {
    if (config.node_env == "prod") {
      // HTTPS setup

      if (!this.sslExists()) {
        console.error("Error : Please specify SSL crendetials");
      } else {
        const creds = {
          cert: config.server.ssl_cert,
          key: config.server.ssl_key,
        };

        https
          .createServer(creds, this.app)
          .listen(config.server.port, () => this.onReady(true));
      }
    } else {
      // HTTP setup

      this.app.listen(config.server.port, this.onReady);
    }
  }
}

function createServer(router: any, apiRoot?: string) {
  const app = express();

  app.use(apiRoot ?? "/", router);
  app.use("*", error404);
  app.use(errorMiddleware);

  return new Server(app);
}
