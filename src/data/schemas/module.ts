import * as mongoose from "mongoose";
import "../database";

export interface IResource {
    name: string;
    link: string;
}

export interface IModule extends mongoose.Document {
    id: mongoose.Schema.Types.ObjectId;
    code: string;
    name: string;
    teachers: number[];
    ressources: IResource[];
}

export const ClassroomSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, auto: true },
    link: [{ type: String, required: true }]
});

const Classroom = mongoose.model<IModule>("Classroom", ClassroomSchema);
export default Classroom;
