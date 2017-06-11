import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Mensagens } from '../global/mensagens'
import 'rxjs/add/operator/map';

@Injectable()
export class DespesasServico {

  urlDespesas:string;
  urlFuncoes:string;
  constructor(public http: Http,public global: Mensagens) {
    console.log('Hello DespesasServico Provider');
    this.urlDespesas = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v2.1.0/consultarDespesas';
    this.urlFuncoes = 'https://gatewayapi.prodam.sp.gov.br:443/financas/orcamento/sof/v2.1.0/consultarFuncoes';
  }

  getDespesasProvider(params){
    console.log('Chegou no provider DESPESAS --- mes/ano: ' + params);
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
        console.log(this.urlDespesas + '?' + params);
        this.http.get(this.urlDespesas + '?' + params, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getFuncoesProvider(anoParam){
    console.log('Chegou no provider FUNCOES: Ano ---' + anoParam);
    let headers = new Headers({
      'Content-Type': this.global.txtContentTyoe ,
      'Authorization': this.global.txtToken
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
        console.log(this.urlFuncoes + '?' + anoParam);
        this.http.get(this.urlFuncoes + '?' + anoParam, options)
        .map(res => res.json())
        .subscribe( data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }




}
