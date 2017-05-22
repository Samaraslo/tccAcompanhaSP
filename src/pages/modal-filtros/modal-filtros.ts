import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ContratosService } from '../../providers/contratos-service';
import { Contratos } from '../contratos/contratos';

@Component({
  selector: 'page-modal-filtros',
  templateUrl: 'modal-filtros.html',
  providers: [ContratosService]
})
export class ModalFiltros {
  filtros:any = {};
  contratosFiltrados: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public contratosService: ContratosService) {

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalFiltrosPage');
  }
  closeModal(){
  //  this.viewCtrl.dismiss();
    this.navCtrl.push(Contratos);
    

  }

  validarValores(){
    if(this.filtros.codContrato == null)  this.filtros.codContrato  = '';
    if(this.filtros.codEmpresa  == null)  this.filtros.codEmpresa   = '';
    if(this.filtros.numCpfCnpj  == null)  this.filtros.numCpfCnpj   = '';
    if(this.filtros.anoContrato == null)  this.filtros.anoContrato  = '';
    if(this.filtros.codOrgao    == null)  this.filtros.codOrgao     = '';

  }

  aplicarFiltros(){
    //this.viewCtrl.dismiss(this.filtros);
    this.validarValores();
console.log('0');
    let strParam =      'codContrato='+ this.filtros.codContrato
                    + '&codEmpresa='  + this.filtros.codEmpresa
                    + '&numCpfCnpj='  + this.filtros.numCpfCnpj
                    + '&anoContrato=' + this.filtros.anoContrato
                    + '&codOrgao='    + this.filtros.codOrgao;

      this.contratosService.getContratoComFiltroProvider(strParam)
      .then((res) => {
        if (res) {
          this.contratosFiltrados = res;
          console.log('1', this.contratosFiltrados);
          this.viewCtrl.dismiss(this.contratosFiltrados);
        }
      }, (error) => {
        console.log('2', error);
          this.viewCtrl.dismiss();
      })


  }

}
