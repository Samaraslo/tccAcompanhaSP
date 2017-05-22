import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { CredoresService } from '../../providers/credores-service';
import { ModalFiltros } from '../modal-filtros/modal-filtros';
import { DetalhesContrato } from '../detalhes-contrato/detalhes-contrato';
import { Mensagens } from '../../global/mensagens';
import { GraficoContratos } from '../grafico-contratos/grafico-contratos';


@Component({
  selector: 'page-page1',
  templateUrl: 'credores.html',
  providers: [CredoresService /*,GraficoContratos, DetalhesContrato*/]

})
export class Credores {

  credores: any = {};
  codigoContrato : any;
  codigoEmpresa : any;
  anoContrato : any;


  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public credoresService: CredoresService,
    public loadingCtrl: LoadingController
    /*public modalCtrl: ModalController,
    public detalhesContratoCtrl: DetalhesContrato,
    public global: Mensagens,
    public graficos:GraficoContratos*/) {
    this.codigoContrato = navParams.get('paramCodContrato');
    this.codigoEmpresa =  navParams.get('paramCodEmpresa');
    this.anoContrato =  navParams.get('paramAnoContrato');
    console.log('cod', this.codigoContrato + 'codEmpresa: ', this.codigoEmpresa + 'anoContrato: ', this.anoContrato);

    //  this.initializeItems();
    this.getCredoresDeContrato();


  }

  getCredoresDeContrato() {

      let loader = this.loadingCtrl.create();

    loader.present().then(() => {
    this.credoresService.getCredoresDeContratoProvider(this.codigoContrato, this.codigoEmpresa, this.anoContrato )
      .then((res) => {
        if (res) {
          this.credores = res;
          console.log('1', this.credores);
          loader.dismiss();
        }
      }, (error) => {
        console.log('2', error);
        loader.dismiss();
      })
    })
  }

/*  getCredoresDeContrato(codContrato) {
    let modal = this.modalCtrl.create(DetalhesContrato,{
      paramCodContrato : codContrato
    });
    modal.onDidDismiss(data=>{
      console.log('Filtros =>' , data);
      //chamar ws passando os parametros
    });
    modal.present();
  }

  openModalFiltros() {
    let modal = this.modalCtrl.create(ModalFiltros);
    modal.onDidDismiss(data => {
      console.log('Filtros =>', data);
      this.credores = data;
    });
    modal.present();
  }

  openGrafico(){
    let modal = this.modalCtrl.create(GraficoContratos, {
      objContrato: this.credores
    });
    modal.present();
  }

  openInformacoes() {
    let alert = this.alertCtrl.create({
      title: this.global.msgTituloInfoContrato,
      subTitle: this.global.msgConteudoInfoContrato,
      buttons: ['OK, entendi! :) ']
    });
    alert.present();
  }*/
}
