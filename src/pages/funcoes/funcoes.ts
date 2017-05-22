import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DespesasServico } from '../../providers/despesas-servico';

/*
  Generated class for the Funcoes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-funcoes',
  templateUrl: 'funcoes.html',
  providers: [DespesasServico]
})
export class FuncoesPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  objFuncoes: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public despesasServico: DespesasServico) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncoesPage');
    this.carregarGraficoFuncoes();
    this.consultarFuncoes(this.navParams.get('anoParam'));
  }

  carregarGraficoFuncoes(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Saúde", "Segurança Pública", "Esporte", "Educação"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#009688",
                    ],
                    hoverBackgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)'
                    ]
                }]
            }

        });
  }


  consultarFuncoes(anoParam){
  console.log('0');
  //anoParam = this.myYear;
  //mesParam = this.myMonth;
  console.log('anoParam' + anoParam);

      let strParam = 'anoExercicio='+ anoParam;

        this.despesasServico.getFuncoesProvider(strParam)
        .then((res) => {
          if (res) {
            this.objFuncoes = res;

            console.log('1', this.objFuncoes);


          //    this.carregarGrafico();
          }
        }, (error) => {
          console.log('2', error);
        })
  }

}
