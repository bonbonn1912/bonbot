import mongoose from "mongoose";
import { CONFIG } from "../config/config";
const { Schema } = mongoose;
const user_session = new Schema({
  login: String,
  accessToken: String,
  refreshToken: String,
  account: Object,
});
console.log(CONFIG.MONGO_DB.CON_STRING)
mongoose.connect(CONFIG.MONGO_DB.CON_STRING+"/users", ()=>{console.log("connected")})
export const UserModel = mongoose.model("user_accounts", user_session);