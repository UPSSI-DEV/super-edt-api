import calendar from "./calendar";
import supabase, { Calendar, Class } from "./supabase";

class EventManager {
  public async getEventsForClass(class_name: string) {
    const calendarIds = await this.getCalFromClassName(class_name);
    return calendar.get(calendarIds);
  }

  private async getCalFromClassName(class_name: string): Promise<string[]> {
    const classes = await supabase
      .from<Class>("Classes")
      .select("*")
      .eq("name", class_name);
    if (classes.error || classes.data.length == 0) return [];

    const calendars = await supabase
      .from<Calendar>("Calendars")
      .select("*")
      .in("id", classes.data.shift()?.links ?? []);

    if (calendars.error) return [];
    else return calendars.data?.map((x) => x.link) as string[];
  }
}

export default new EventManager();
