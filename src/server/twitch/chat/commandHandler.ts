class CommandManager {
    private userCommands: Record<string, Record<string, string>> = {};

    constructor() {}

    addUser(username: string) {
        if (!this.userCommands[username]) {
            this.userCommands[username] = {};
        }
    }

    addCommand(username: string, trigger: string, command: string) {
        if (!this.userCommands[username]) {
            this.addUser(username);
        }
        this.userCommands[username][trigger] = command;
    }

    getCommand(username: string, trigger: string): string | undefined {
        return this.userCommands[username]?.[trigger];
    }

    printUserCommands(username: string) {
        const userCommands = this.userCommands[username];

        if (userCommands) {
            console.log(`Commands for ${username}:`);
            for (const command in userCommands) {
                const trigger = userCommands[command];
                console.log(`- ${command}: ${trigger}`);
            }
        } else {
            console.log(`No commands found for ${username}`);
        }
    }
    doesCommandExist(username: string, command: string): boolean {
        const userCommands = this.userCommands[username];
        return userCommands && userCommands.hasOwnProperty(command);
    }
    updateCommand(username: string, command: string, newTrigger: string): boolean {
        const userCommands = this.userCommands[username];
        if (userCommands && userCommands.hasOwnProperty(command)) {
            userCommands[command] = newTrigger;
            return true;
        }
        return false;
    }

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