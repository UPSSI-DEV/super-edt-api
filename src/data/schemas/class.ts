import * as mongoose from "mongoose";
import "../database";

export interface IClassroom extends mongoose.Document {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    calendars: string[];
}

export const ClassroomSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, auto: true },
    link: [{ type: String, required: true }]
});

const Classroom = mongoose.model<IClassroom>("Classroom", ClassroomSchema);
export default Classroom;
