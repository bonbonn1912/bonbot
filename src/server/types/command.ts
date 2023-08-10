export interface command {
   commandId: number,
   trigger: string,
   value: string,
   registeredAt: any,
   updatedAt: any,
   isActive: boolean,
   count: number,
   streamer: string,
   intervall: number,
   isRepetitive: boolean,
}