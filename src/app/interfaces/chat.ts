export interface Partecipante {
  username: string;
  nome: string;
  cognome: string;
  telefono: string;
  profileImage: string;
  email: string;
}

export interface Messaggio {
  content: string,
  messageStatus: string,
  sendAtTime: string,
  userSender: string
}

export interface IChatDto {
  messaggi: Messaggio[];
  listaPartecipanti: Partecipante[];
  createdAt: string;
  chatIdentity: string;
}
