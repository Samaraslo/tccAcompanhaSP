import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DespesasServico } from '../../providers/despesas-servico';

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
  myDate: Date;
  myYear: any;
  myMonth: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public despesasServico: DespesasServico) {

                this.myDate = new Date();
                this.myYear = this.myDate.getFullYear();
                this.myMonth = this.myDate.getMonth()+1;

                this.consultarFuncoes(this.myYear);
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncoesPage');


    this.consultarDespesasFuncoes("2017","05","10");
    this.consultarDespesasFuncoes("2017","05","06");
    this.consultarDespesasFuncoes("2017","05","12");
    this.consultarDespesasFuncoes("2017","05","13");

  }

  carregarGraficoFuncoes(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Saúde", "Segurança", "Educação", "Cultura"],
                datasets: [{
                    label: ["Saúde", "Segurança", "Educação", "Cultura"],
                    data: [this.valRealizadoSaude, this.valRealizadoSeguranca, this.valRealizadoEducacao, this.valRealizadoCultura],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#009688",
                      "#FFCE56",

                    ],
                    hoverBackgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                    ]
                }]
            },
            options: {
              responsive:true,
              tooltips:{
                callbacks:{
                  label: function(tooltipItem, data){
                    console.log(data.datasets[tooltipItem.datasetIndex]);

                    console.log(data.datasets[tooltipItem.datasetIndex].label[0]);
                    console.log(data.datasets[tooltipItem.datasetIndex].label[1]);
                    console.log(data.datasets[tooltipItem.datasetIndex].label[2]);
                    console.log(data.datasets[tooltipItem.datasetIndex].label[3]);
                    for(let i = 0; i < 4; i++)
                    {
                      //(data.datasets[tooltipItem.datasetIndex].label[0] == 'Saúde'){
                      //console.log('entrou 0');
                      let numSaude = data.datasets[tooltipItem.datasetIndex].data[i].toFixed(2);
                      numSaude = numSaude.replace(".",",");
                      console.log(numSaude);

                      return 'R$ ' + String(numSaude).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                      }
                    }
                    /* if(data.datasets[tooltipItem.datasetIndex].label[1] == 'Segurança'){
                      console.log('entrou 1');
                      let numSeguranca = parseInt(data.datasets[tooltipItem.datasetIndex].data[1]).toFixed(2);
                      numSeguranca = numSeguranca.replace(".",",");
                      return 'R$ ' + String(numSeguranca).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    }
                    if(data.datasets[tooltipItem.datasetIndex].label[2] == 'Educação'){
                      console.log('entrou 2');
                      let numEducacao = parseInt(data.datasets[tooltipItem.datasetIndex].data[2]).toFixed(2);
                      numEducacao = numEducacao.replace(".",",");
                      data.datasets[tooltipItem.datasetIndex].label[2] = 'R$ ' + String(numEducacao).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    } if(data.datasets[tooltipItem.datasetIndex].label[3] == 'Cultura'){
                      console.log('entrou 3');
                      let numCultura = parseInt(data.datasets[tooltipItem.datasetIndex].data[3]).toFixed(2);
                      numCultura = numCultura.replace(".",",");
                      data.datasets[tooltipItem.datasetIndex].label[3] = 'R$ ' + String(numCultura).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    }

                  }*/
                }
              },
          }


        });
  /*  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

            type: 'doughnut',
            data: {
                labels: ["Teste"],
                datasets: [{
                    label: 'Saúde',
                    data: [this.valRealizadoSaude],
                    backgroundColor: "#FF6384",
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label:'Segurança',
                    data: [this.valRealizadoSeguranca],
                    backgroundColor: "#36A2EB",
                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.5)',
                  },
                  {
                    label:'Educação',
                    data: [this.valRealizadoEducacao],
                    backgroundColor: "#009688",
                    hoverBackgroundColor: 'rgba(255, 206, 86, 0.5)',
                  },
                  {
                    label:'Cultura',
                    data: [this.valRealizadoCultura],
                    backgroundColor: "#FFCE56",
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.5)',
                  }
              ]
            }

        });*/
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
  console.log('anoParam' + anoParam);

      let strParam = 'anoExercicio='+ anoParam;

        this.despesasServico.getFuncoesProvider(strParam)
        .then((res) => {
          if (res) {
            this.objFuncoes = res;

            console.log('1****', this.objFuncoes);


          //    this.carregarGrafico();
          }
        }, (error) => {
          console.log('2', error);
        })
  }

}
