import mongoose from "mongoose";
import { DB_CONFIG } from "../config";

const connectToDb = async () => {
    try {
        const uri = `mongodb://${DB_CONFIG.DB_USER}:${DB_CONFIG.DB_PASSWORD}@${DB_CONFIG.DB_HOST}:${DB_CONFIG.DB_PORT}/${DB_CONFIG.DB}?authSource=admin`;
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

export default connectToDb;
