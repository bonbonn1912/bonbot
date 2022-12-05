import dotenv from "dotenv";

dotenv.config({path: './../../.env'});

export const CONFIG = {
 SERVER : {
    PORT: process.env.PORT
 },
 DATABASE: {
    CON_STRING: process.env.DATABASE_URL as string
 },
 TWITCH:{
    CLIENT_ID: process.env.TWITCH_CLIENT_ID as string,
    CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET as string
 }
}