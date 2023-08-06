import mongoose, {  type Schema } from 'mongoose'
import { CONFIG } from "../config/config";

const user_session = new mongoose.Schema({
  login: String,
  accessToken: String,
  refreshToken: String,
  account: Object,
  isAdmin:  { type: Boolean, default: true},
  isSetup:{ type: Boolean, default: false},
});
console.log(CONFIG.MONGO_DB.CON_STRING)
mongoose.connect(CONFIG.MONGO_DB.CON_STRING+"/users", ()=>{console.log("connected to Mongodb")})
export const UserModel = mongoose.model("user_accounts", user_session);

const getConnection = async () =>{
  let connectionResult;
  const connectionString: string = CONFIG.MONGO_DB.CON_STRING as string + "/users"
  try {
    connectionResult = await mongoose.connect(connectionString)
  } catch {
    console.log('Could not connect to Database')
  }finally{
    return connectionResult
  }
}

const extendSchema = (schema: mongoose.Schema): mongoose.Schema => {
  const extendedSchema = new mongoose.Schema({
    ...schema.obj
  })
  return extendedSchema
}
const getModel = (schema: Schema, collection: string) => {
  return mongoose.models[collection] || mongoose.model(collection, schema)
}


export const setSetupState = async (username: string) =>{
  const filter = { "isSetup" : false , "login" : username }
  const update = { "isSetup" : true }
  mongoose.set('strictQuery', true)
//  let connectResult = await getConnection()
  const extendedSchema = extendSchema(user_session)
  const Model = getModel(extendedSchema,"user_accounts");

     let result = await Model.findOneAndUpdate(filter, update)

     if(result == null){
      console.log("Updated User : "+ username)
     }
  }
 






