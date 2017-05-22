import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Mensagens } from '../global/mensagens'
import 'rxjs/add/operator/map';


@Injectable()
export class CredoresService {

  urlCredores:string;
  token:string;

  constructor(public http: Http,public global: Mensagens) {
    console.log('Hello CredoresService Provider');
    this.urlCredores = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v2.1.1/consultarCredoresDeContrato';
  }

  getCredoresDeContratoProvider(codContrato, codigoEmpresa, anoContrato){
    console.log('Chegou no provider --- codigo: ' + codContrato)
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

        this.http.get(this.urlCredores + '?codContrato=' + codContrato + '&codEmpresa=' + codigoEmpresa + '&anoExercicio=' + anoContrato , options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
