export interface Partecipante {
  username: string;
  nome: string;
  cognome: string;
  telefono: string;
  profileImage: string;
  email: string;
}

export interface Messaggio {
  // Aggiungi qui le proprietà dei messaggi quando saranno disponibili
  // Per esempio:
  // id: string;
  // testo: string;
  // mittente: string;
  // timestamp: string;
  // letto: boolean;
}

export interface IChatDto {
  messaggi: Messaggio[];
  listaPartecipanti: Partecipante[];
  createdAt: string;
  chatIdentity: string;
}
