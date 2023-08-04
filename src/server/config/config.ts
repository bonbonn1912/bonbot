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
   CHAT:{
      CLIENT_ID: process.env.TWITCH_CHAT_CLIENT_ID as string,
      ACCESS_TOKEN: process.env.TWITCH_CHAT_ACCESS_TOKEN as string,
      REFRESH_TOKEN: process.env.TWITCH_CHAT_REFRESH_TOKEN as string,
   },
    CLIENT_ID: process.env.TWITCH_CLIENT_ID as string,
    CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET as string
 }, 
 MONGO_DB:{
   CON_STRING: 'mongodb://127.0.01:27017' as string
 }
}