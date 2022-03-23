import "module-alias/register";
import { readFileSync, existsSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

// Exports
export default {
  version: "1.0.0",
  node_env: (process.env.NODE_ENV ?? "dev") as "dev" | "prod",

  server: {
    port: envNum("PORT", 3000),
    ssl_cert: loadFile(process.env.SSL_CRT),
    ssl_key: loadFile(process.env.SSL_KEY),
  },

  feedback: {
    sheetId: "1A4-BP6g75LKjC-6SxJIKspzSg1RGHE6_gKj7D9npzSU",
    apiKey: require("../bob.secret.json"),
  },

  calendar: {
    api_key: mandatoryStr("CALENDAR_API_KEY"),
  },

  subabase: {
    host: mandatoryStr("SUPABASE_HOST"),
    api_key: mandatoryStr("SUPABASE_API_KEY"),
  },
};

// Methods & types

function envNum(key: string, default_val: number): number {
  const buffer = process.env[key] ?? default_val;
  const value: number = +buffer;

  return value;
}

function loadFile(path: string | undefined): string | undefined {
  return path != undefined && existsSync(path)
    ? readFileSync(path, "utf-8")
    : undefined;
}

function mandatoryStr(key: string): string {
  if (process.env[key] == undefined)
    throw new Error(`Missing env variable '${key}'`);
  else return process.env[key] ?? "";
}
