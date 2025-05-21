export interface ILogin {
  username: string;
  password: string
}

export interface IRegister {
  "username": string,
  "password": string,
  "nome": string,
  "cognome": string,
  "cf": string,
  "dataNascita": string,
  "luogoNascita": string,
  "telefono": string,
  "email": string
}

export interface ITokenStructure {
  "image": string,
  "role": string,
  "id": number,
  "sub": string,
  "iat": number,
  "exp": number,
  full_name: string

}
