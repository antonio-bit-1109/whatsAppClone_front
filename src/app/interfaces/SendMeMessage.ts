export interface ISendMeMessage {
  sender: string;
  message: string;
}


export interface IMessageSent {
  "emailSender": string,
  "haveReplied": boolean,
  "contentMsg": string
}
