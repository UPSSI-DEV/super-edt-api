import "./config";
import { createServer, routeManager } from "@/routes";

createServer(routeManager).start();
