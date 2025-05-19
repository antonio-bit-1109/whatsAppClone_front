import {HttpErrorResponse} from '@angular/common/http';


export interface IErrorResponse {
  apiPath: string;
  errMsg:string
  httpStatus:string
  timeError: string
}


// handling the error response extracting the HttpResponseObject just once and passing
// the function where necessary

export function handleHttpErrorResp(err:HttpErrorResponse){
    const errObj = err.error as IErrorResponse;
    return makeErrRespReadable(errObj.errMsg);
}

function makeErrRespReadable(errMsg:string){

  // errore di unique constraints violata
  if (errMsg.includes("unique constraint")){
    const start = errMsg.indexOf("Dettaglio:")
    return errMsg.substring(start + 14, errMsg.indexOf("]") - 1)
      .replace(/[()=]/g," ")
  }


  return errMsg;
}
