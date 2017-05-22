import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Mensagens } from '../global/mensagens'
import 'rxjs/add/operator/map';


@Injectable()
export class ContratosService {

  urlContrato:string;

  constructor(public http: Http,public global: Mensagens) {
    console.log('Hello ContratosService Provider');
    //URL do método do WS - Consulta Contratos
    this.urlContrato = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v2.1.1/consultaContrato';
  }
//chamada para o ws utilizando token de acesso
  getAllContratosProvider(){
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(this.urlContrato, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
//este método é chamado ao clicar em um contato específico
//o método a seguir é usado para retornar os detalhes do contrato
  getThisContratoProvider(codContrato){
    console.log('Chegou no provider --- codigo: ' + codContrato)
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

        this.http.get(this.urlContrato + '?codContrato=' + codContrato, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
//o método a seguir é utilizado para retornar os dados filtrados do contrato
  getContratoComFiltroProvider(params){
    console.log('Chegou no provider --- codigo: ' + params)
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
        console.log(this.urlContrato + '?' + params);
        this.http.get(this.urlContrato + '?' + params, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
