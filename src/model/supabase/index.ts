import { createClient } from "@supabase/supabase-js";
import config from "@/config";

const supabase = createClient(config.subabase.host, config.subabase.api_key);

export default supabase;
export * from "./types";
