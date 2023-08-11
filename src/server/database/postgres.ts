import { PrismaClient } from '@prisma/client'
import { CONFIG } from '../config/config';
import chatManager from '../twitch/chat/clientHandler';
import { command } from '../types/command';
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
    return new Promise((res, rej) =>{
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
            res(results)
        }).catch(err =>{
            console.log(err)
            rej(err)
        })
    })
   
}

export async function getAllUsers(): Promise<string[]>{
    return new Promise((res, rej) =>{
        prisma.user.findMany({
            select:{
              username: true  
            }
        }).then((userList) =>{
            res(userList.map(el => el.username))
        }).catch((err) =>{
            console.log("Could not fetch userlist")
            rej([])
        })
    })
}

export async function getCommandForUser(username: string): Promise<command[]>{
    return new Promise((res, rej) =>{
        prisma.commands.findMany({
            where: {
                streamer: username,
            },
        }).then((data: command[]) =>{
            res(data)
        }).catch(err =>{
           rej(err)
        })
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

export async function addCommandToDb(username: string, command: string, value: string){
    return new Promise((res, rej) =>{
      prisma.commands.create({
        data: {
            trigger: command,
            value: value,
            isActive: true,
            count: 0,
            streamer: username,
            intervall: 0,
            isRepetitive: false, 
            isPrivileged: true,
        }
      }).then((user) =>{
        res(user)
      } ).catch((err) =>{
        rej(err)
      })
    })
}

export async function updateCommand(username: string, command: string, value: string){
    return new Promise((res,rej) =>{
     prisma.commands.updateMany({
        where: {
            trigger: command,
            streamer: username
          },
          data: { value: value },
     }).then((data) =>{
        res(data)
     }).catch((err) =>{
        console.log(err)
        rej(err)
     })
    })
}

export async function deleteCommand(username: string, command: string){
    return new Promise((res,rej) =>{
     prisma.commands.deleteMany({
        where: {
            trigger: command,
            streamer: username
          },
     }).then((data) =>{
        res(data)
     }).catch((err) =>{
        console.log(err)
        rej(err)
     })
    })
}