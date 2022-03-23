import eventManager from "@/model/eventManager";

/* Exports */
export default { getSubjects };

/* Methods */
async function getSubjects() {
  const events = await eventManager.getEventsForClass("SRI 1A - Groupe 1");

  return events
    .filter((e) => e.summary.includes("**EXAMEN**"))
    .filter((e) => !e.summary.includes("1/3 TEMPS"));
}
