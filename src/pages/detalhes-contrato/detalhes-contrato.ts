import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams, ViewController } from 'ionic-angular';
import { Contratos } from '../contratos/contratos';
import { Credores } from '../credores/credores';

import { ContratosService } from '../../providers/contratos-service';

@Component({
  selector: 'page-detalhes-contrato',
  templateUrl: 'detalhes-contrato.html',
  providers: [ContratosService]

})
export class DetalhesContrato {
  codigoContrato : any;
  detalhes: any = {};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loadingCtrl: LoadingController,
              public contratosService: ContratosService) {
    this.codigoContrato = navParams.get('paramCodContrato');
    console.log('cod', this.codigoContrato);
    this.getDetalhesContrato();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesContratoPage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  getDetalhesContrato(){
    let loader = this.loadingCtrl.create();

  loader.present().then(() => {
    this.contratosService.getThisContratoProvider(this.codigoContrato)
      .then((res) => {
        if (res) {
          this.detalhes = res;
          console.log('1', this.detalhes);
          loader.dismiss();
        }
      }, (error) => {
        console.log('2', error);
        loader.dismiss();
      })
    })
  }

  openCredoresContrato(){
    this.navCtrl.push(Credores, {
      paramCodContrato: this.codigoContrato,
      paramCodEmpresa: '04',
      paramAnoContrato: '2012',
    });
    console.log(this.codigoContrato +' '+this.detalhes.codEmpresa +' '+this.detalhes.anoContrato)

  }

}
