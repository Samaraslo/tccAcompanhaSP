import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  anoDif: any;
  mesDif: any;
  valRealizadoSaude: any;
  valRealizadoSeguranca: any;
  valRealizadoCultura: any;
  valRealizadoEducacao: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public despesasServico: DespesasServico) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncoesPage');
    //this.carregarGraficoFuncoes();
  //  this.consultarFuncoes(this.navParams.get('anoParam'));
    this.consultarDespesasFuncoes("2017","05","10");
    this.consultarDespesasFuncoes("2017","05","06");
    this.consultarDespesasFuncoes("2017","05","12");
    this.consultarDespesasFuncoes("2017","05","13");
//    this.carregarGraficoFuncoes();
  }

  carregarGraficoFuncoes(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Saúde", "Segurança Pública", "Cultura", "Educação"],
                datasets: [{
                    label: '# of Votes',
                    data: [this.valRealizadoSaude, this.valRealizadoSeguranca, this.valRealizadoCultura, this.valRealizadoEducacao],
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

buscarComAnoMesDiferente(){
  this.consultarDespesasFuncoes(this.anoDif, this.mesDif,"10");
  this.consultarDespesasFuncoes(this.anoDif, this.mesDif,"06");
  this.consultarDespesasFuncoes(this.anoDif, this.mesDif,"12");
  this.consultarDespesasFuncoes(this.anoDif, this.mesDif,"13");
}

consultarDespesasFuncoes(anoParam, mesParam, codFuncao){

  let loader = this.loadingCtrl.create();

loader.present().then(() => {

    let strParam = 'anoDotacao='+ anoParam + '&mesDotacao='  + mesParam + '&codFuncao=' + codFuncao;

    this.despesasServico.getDespesasProvider(strParam)
    .then((res) => {
      if (res) {

        this.objFuncoes = res;

        if(codFuncao == '10')
        this.valRealizadoSaude = this.objFuncoes.lstDespesas[0].valPagoExercicio;
        if(codFuncao == '06')
        this.valRealizadoSeguranca = this.objFuncoes.lstDespesas[0].valPagoExercicio;
        if(codFuncao == '12')
        this.valRealizadoEducacao =  this.objFuncoes.lstDespesas[0].valPagoExercicio;
        if(codFuncao == '13')
        this.valRealizadoCultura =  this.objFuncoes.lstDespesas[0].valPagoExercicio;

        this.carregarGraficoFuncoes();
        loader.dismiss();
      }
    }, (error) => {
      console.log('2', error);
      loader.dismiss();
      })
  })
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
