export interface ISendMeMessage {
  sender: string;
  message: string;
}


export interface IMessageSent {
  id: number,
  "emailSender": string,
  "haveReplied": boolean,
  "contentMsg": string,
  receivedAt: Date
}
