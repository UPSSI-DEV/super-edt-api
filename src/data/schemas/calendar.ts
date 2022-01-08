import * as mongoose from "mongoose";
import "../database";

export interface ICalendar extends mongoose.Document {
    id: mongoose.Schema.Types.ObjectId;
    link: string;
}

export const CalendarSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, auto: true },
    link: { type: String, required: true }
});

const Calendar = mongoose.model<ICalendar>("Calendar", CalendarSchema);
export default Calendar;
