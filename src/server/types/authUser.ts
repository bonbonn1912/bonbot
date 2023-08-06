export interface Channels{
    channel: String[]
}

export interface authUser {
    isAdmin: boolean,
    isSetup: boolean,
    username: string,
    description: string,
    isBotConnected?: boolean,
    profileImageUrl?: string,
}