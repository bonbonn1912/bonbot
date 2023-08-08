import { PrismaClient } from '@prisma/client'
import { CONFIG } from '../config/config';
import chatManager from '../twitch/chat/clientHandler';
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
    console.log("hier bin ich")
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
            chatManager.addClient(el.username as string, false)
         
           // connectToTwitchChat(el.username as string, false)
        })
      
    }).catch(err =>{
        console.log(err)
    })
}

export async function setConnectionStatePostGres(login: string, isBotConnected: boolean){
    return new Promise((res, rej) =>{
        prisma.user.update({
            where: {
                username: login,
            },
            data:{
                isBotConnected: isBotConnected
            }
        }).then((data) =>{
            res(data)
          
        }).catch(err =>{
           rej(err)
        })
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