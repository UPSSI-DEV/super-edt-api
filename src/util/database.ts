import { MongoClient, Db } from "mongodb";
import * as dotenv from "dotenv";

// Using class to create static instance of the database
export default class DB {
    private static client: MongoClient;
    private static db: Db;

    private static async init() {
        dotenv.config();
        const address: string = `${process.env.MONGO_ADDR}`;

        this.client = new MongoClient(address);
        await this.client.connect();

        this.db = this.client.db("super-edt");
    }

    public static async get() {
        if (!this.db) await this.init();
        return this.db;
    }

    public static close() {
        if (this.client == null) this.init;
        this.client.close();
    }
}
