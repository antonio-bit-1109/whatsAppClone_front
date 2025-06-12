export interface IMessageAddChat {
  "userOwnerId": number,
  "text": string,
  "chatIdentity": string

}


// export interface IDataToastMsg {
//   data: { url: string }
// }

export interface ReplayMessageDTO {
  replayMessage: string; // messaggio necessario
  object: string; // oggetto email necessario
  idStoredMessage: number; // id non può essere null
}
