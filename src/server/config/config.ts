import dotenv from "dotenv";

dotenv.config({path: '../../.env'});

export const CONFIG = {
 SERVER : {
    PORT: process.env.PORT
 },
 DATABASE: {
    CON_STRING: process.env.DATABASE_URL as string
 }
}