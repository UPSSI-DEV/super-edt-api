import config from "./config";
import calendarAPI from "./calendar";

import { createClient } from "@supabase/supabase-js";
import { Calendar, Event } from "./supabase-types";

async function main() {
  console.clear();
  console.log("== Start ==");

  const supabase = createClient(config.subabase.host, config.subabase.api_key);

  try {
    //
    // Retrieve calendar list
    const calendars = await supabase.from<Calendar>("Calendars").select("*");
    if (calendars.error) throw new Error("Failed to fetch calendars");
    const idList = calendars.data.map((x) => x.link);

    // Get events for each calendar
    const events = await calendarAPI.get(idList);
    const uploadEvents: Event[] = events.map((ev) => ({
      summary: ev.summary,
      start_time: ev.startTime.toUTCString(),
      end_time: ev.endTime.toUTCString(),
      origin: ev.origin,
    }));

    console.log(
      `[Calendar] Fetched ${events.length} events for ${idList.length} calendars.`
    );

    const deleteReq = await supabase.from("Events").delete().gt("id", 0); // Modify to delete all records
    if (deleteReq.error) throw new Error("Failed to empty cache");
    console.log("[Calendar] Emptied event records");

    const resetReq = await supabase.from("Events");
    const x = `alter sequence "Events_id_seq" restart with 1`;

    const uploadReq = await supabase.from("Events").insert(uploadEvents);
    if (uploadReq.error) throw new Error("Failed to upload new data");
    console.log("[Calendar] Uploaded new events");
    //
  } catch (e) {
    //
    const err: Error = <Error>e;
    console.error("[Error]", err.message);
    //
  }

  console.log("=== End ===");
}

main();
