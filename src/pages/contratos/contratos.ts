import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { ContratosService } from '../../providers/contratos-service';
import { ModalFiltros } from '../modal-filtros/modal-filtros';
import { DetalhesContrato } from '../detalhes-contrato/detalhes-contrato';
import { Mensagens } from '../../global/mensagens';
import { GraficoContratos } from '../grafico-contratos/grafico-contratos';


@Component({
  selector: 'page-page1',
  templateUrl: 'contratos.html',
  providers: [ContratosService, GraficoContratos, DetalhesContrato, Mensagens]

})
export class Contratos {

  objContratos: any = {};
  lstContratosSearch: any = {};

  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public contratosService: ContratosService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public detalhesContratoCtrl: DetalhesContrato,
    public global: Mensagens,
    public graficos:GraficoContratos) {

    this.getAllContratos();
    this.initializeItems();

  }

/*o método a seguir passa para um array os valores recebidos do metodo do provider,
  desta forma, consigo manipular facilmente os dados na View
*/
  getAllContratos() {
    let loader = this.loadingCtrl.create();

  loader.present().then(() => {
    this.contratosService.getAllContratosProvider()
      .then((res) => {
        if (res) {
          this.objContratos = res;
          console.log('1', this.objContratos);
            loader.dismiss();
        }
      }, (error) => {
        console.log('2', error);
          loader.dismiss();
      })
  })  


}
  /*o método a seguir redireciona para pagina de Detalhes do Contrato passando
    no parametro o código do contrato clicado, ao entrar na pagina de detalhes,
    é feita uma nova consulta ao WS porém passando esse parametro para retornar os dados
    especificos deste contrato
  */
  openDetalhesContrato(codContrato) {
    this.navCtrl.push(DetalhesContrato, {
        paramCodContrato : codContrato
    });
  }

  openModalFiltros() {
    let modal = this.modalCtrl.create(ModalFiltros);
    modal.onDidDismiss(data => {
      console.log('Filtros =>', data);
      console.log('4');
      this.objContratos = data;
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    modal.present();
  }

  openGrafico(){
    this.navCtrl.push(GraficoContratos, {
        objContrato: this.objContratos
    });
  }


/*O método a seguir abre um alert contendo as informações do contrato,
esses textos estão todos na classe Mensagens, dentro da pasta global*/

  openInformacoes() {
    let alert = this.alertCtrl.create({
      title: this.global.msgTituloInfoContrato,
      subTitle: this.global.msgConteudoInfoContrato,
      buttons: ['OK, entendi! :) ']
    });
    alert.present();
  }

  initializeItems(): void {
    this.lstContratosSearch = this.objContratos;
  }

  getItems(searchbar) {
      // Reset items back to all of the items
      this.initializeItems();
      // set val to the value of the searchbar
      var q = searchbar.srcElement.value;
      if (!q) {
        return;
      }

      this.lstContratosSearch = this.lstContratosSearch.filter((v) => {
        if(v.codContrato && q) {
          if (v.codContrato.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });


    }
}
