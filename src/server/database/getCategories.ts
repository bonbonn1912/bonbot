import mysql from 'mysql2/promise'
import { CONFIG } from '../config/config'

export const getData = async(id: number) =>{
    const connection = await mysql.createConnection(CONFIG.DATABASE.CON_STRING)
   const rows = await connection.execute("SELECT * FROM categories;")
   return rows
}