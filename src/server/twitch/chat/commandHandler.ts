import { command } from "../../types/command";
import { getCommandForUser } from "../../database/postgres";

class CommandManager {
    private userCommands: Record<string, Record<string, command>> = {};

    constructor() {}

    addUser(username: string) {
        if (!this.userCommands[username]) {
            this.userCommands[username] = {};
        }
    }

    addCommand(username: string, trigger: string, command: command) {
        if (!this.userCommands[username]) {
            this.addUser(username);
        }
        this.userCommands[username][trigger] = command;
    }

    getCommand(username: string, trigger: string): command | undefined {
        return this.userCommands[username]?.[trigger];
    }

    async reloadCommands(username: string) {
        this.removeUser(username)
       
       try{
        const commandList = await getCommandForUser(username);
        commandManager.addUser(username);
        for (const command of commandList) {
            commandManager.addCommand(username, command.trigger, command);
        }
        console.log("Commands reloaded")
       }catch(e){
        console.log("Could not reload Commands")
       }finally{
        return;
       }   
    }
    removeUser(username: string){
        delete(this.userCommands[username])
        return;
    }

    printUserCommands(username: string) {
        const userCommands = this.userCommands[username];

        if (userCommands) {
            console.log(`Commands for ${username}:`);
            for (const command in userCommands) {
                const trigger = userCommands[command];
                console.log(`- ${command}: ${trigger.trigger} - ${trigger.value} - ${trigger.isPrivileged} - ${trigger.isActive}`);
            }
        } else {
            console.log(`No commands found for ${username}`);
        }
    }
    doesCommandExist(username: string, command: string): boolean {
        const userCommands = this.userCommands[username];
        return userCommands && userCommands.hasOwnProperty(command);
    }
  /*  updateCommand(username: string, command: command, newTrigger: string): boolean {
        const userCommands = this.userCommands[username];
        if (userCommands && userCommands.hasOwnProperty(command.trigger)) {
            userCommands[command.trigger] = newTrigger as string;
            return true;
        }
        return false;
    } */

    deleteCommand(username: string, command: string): boolean {
        const userCommands = this.userCommands[username];

        if (userCommands && userCommands.hasOwnProperty(command)) {
            delete userCommands[command];
            return true;
        }

        return false;
    }
}


// Beispielverwendung
const commandManager = new CommandManager();

export default commandManager;