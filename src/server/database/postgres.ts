import { PrismaClient } from '@prisma/client'
import { error } from 'console';
import { connectToTwitchChat } from '../twitch/chat/handler';
import { CONFIG } from '../config/config';
const prisma = new PrismaClient({
    datasources:{
        db:{
            url: CONFIG.DATABASE.POSTGRES_URL
        }
    }
})

export async function insertUser(username: string, isActive: boolean, description: string, isAdmin: boolean, isBotConnected: boolean){
    const user = await prisma.user.create({
        data: {
            username: username,
            isActive: isActive,
            isAdmin: isAdmin, 
            description: description,
            isBotConnected: isBotConnected,
        }
    }).catch(err => {
        console.log("Could not create user. Reason: " + err)
        return undefined;
    })
    return user;
}

export async function connectOnToTwitchOnStartup(){
    prisma.user.findMany({
        where:{
            isBotConnected: true,
        },
        select: {
            username: true,
        },
    }).then((data) =>{
        const results = data;
        results.map(el => {
            connectToTwitchChat(el.username as string, false)
        })
      
    }).catch(err =>{
        console.log("error fetching active user")
    })
}
/*export async function insertCommand(trigger: string, value: string, intervall: number, isRepetitive: boolean, streamerId: number){
   const command = await prisma.commands.create({
    data:{
       trigger: trigger,
       value: value,
       intervall: intervall,
       isActive: true,
       count: 0,
       streamerid: streamerId,
       isRepetitive: false 
    }
   }).catch(err => {
    console.log("could not insert command. Reason: "+ err)
    return undefined;
   })
   return command;

} */