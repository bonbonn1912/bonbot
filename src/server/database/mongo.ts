import mongoose from "mongoose";
const { Schema } = mongoose;
const user_session = new Schema({
  login: String,
  accessToken: String,
  refreshToken: String,
  account: Object,
});
mongoose.connect("mongodb://127.0.0.1:27017/users", ()=>{console.log("connected")})
export const UserModel = mongoose.model("user_accounts", user_session);