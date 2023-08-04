import { PrismaClient } from '@prisma/client'
import { error } from 'console';
const prisma = new PrismaClient()

export async function insertUser(username: string, isActive: boolean, description: string){
    const user = await prisma.user.create({
        data: {
            username: username,
            isactive: true, 
            description: description
        }
    }).catch(err => {
        console.log("Could not create user. Reason: " + err)
        return undefined;
    })
    return user;
}

export async function insertCommand(trigger: string, value: string, intervall: number, isRepetitive: boolean, streamerId: number){
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

}