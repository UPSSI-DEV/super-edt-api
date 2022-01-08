import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_ADDR ?? "";

mongoose.connect(uri, (err) => {
    if (err) console.error(err);
    else console.log("Mongoose connection succeeded !");
});
