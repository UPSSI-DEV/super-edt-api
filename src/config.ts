import "module-alias/register";
import dotenv from "dotenv";
dotenv.config();

// Exports
export default {
  version: "1.0.0",
  node_env: (process.env.NODE_ENV ?? "dev") as "dev" | "prod",

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

function mandatoryStr(key: string): string {
  if (process.env[key] == undefined)
    throw new Error(`Missing env variable '${key}'`);
  else return process.env[key] ?? "";
}
