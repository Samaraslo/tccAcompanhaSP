import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ContratosService } from '../../providers/contratos-service';

@Component({
  selector: 'page-grafico-contratos',
  templateUrl: 'grafico-contratos.html',
  providers: [ContratosService]
})
export class GraficoContratos {
 objContrato: any = {};
  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  chartType: string = 'bar'; //doughnut
  chartLegend: boolean = true;

  chartData: any[] = [
    { data: [75, 80, 45, 100], label: 'Contrato A' },
    { data: [80, 55, 75, 95], label: 'Contrato B' }
  ];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public contratosService: ContratosService) {

                this.objContrato = navParams.get('objContrato');
                console.log('objContrato', this.objContrato);
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficoContratosPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
