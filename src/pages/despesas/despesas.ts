import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DespesasServico } from '../../providers/despesas-servico';
import { Utils } from '../../global/util';
import { FuncoesPage } from '../funcoes/funcoes';
import { DespesafiltrosPage } from '../despesafiltros/despesafiltros';

@Component({
  selector: 'page-despesas',
  templateUrl: 'despesas.html',
  providers: [DespesasServico]

})
export class DespesasPage {

  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  objDespesas: any = {};
  valOrcadoInicio: string;
  valOrcadoAtual: string;
  valRealizado: string;

  valOrcadoInicioFormat: string;
  valOrcadoAtualFormat: string;
  valRealizadoFormat: string;

  myDate:Date;
  myYear:any;
  myMonth:any;
  anoDif:any;
  mesDif:any;
  labelAno:string;
  labelMes:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public despesasServico: DespesasServico,
              public loadingCtrl: LoadingController,
              private utils: Utils) {


              }
  ionViewDidLoad() {
    this.myDate = new Date();
    this.myYear = this.myDate.getFullYear();
    this.myMonth = this.myDate.getMonth()+1;
    this.labelAno = this.myYear;
    this.labelMes = this.myMonth;
    console.log('>>>>>>' + this.myYear + this.myMonth);
    this.consultarDespesas(this.myYear,this.myMonth);
    console.log('ionViewDidLoad DespesasPage');



  }

  carregarGrafico(){

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
        data: {
            labels: ["Valores: " + this.labelMes+'/'+this.labelAno],
            datasets: [{
                label: 'Orçado Início',
                data: [this.valOrcadoInicio],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
              },
              {
                label:'Orçado Atual',
                data: [this.valOrcadoAtual],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label:'Realizado',
                data: [this.valRealizado],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
              }
            ]
        },
      options: {
        responsive:true,
         scales: {
          yAxes: [{
            display: false
          }],
        },
        tooltips:{
          callbacks:{
            label: function(tooltipItem, data){
              let num = data.datasets[tooltipItem.datasetIndex].data[0].toFixed(2);
              num = num.replace(".",",");
              console.log(String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
              return 'R$ ' + String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            }
          }
        },
      /*    scales: {
              yAxes: [{
                  ticks: {

                      beginAtZero:false
                    }
              }]
          }*/
    }

    });
  }

  buscarComAnoMesDiferente(){
    console.log(this.anoDif +'/'+this.mesDif);
    this.labelMes = this.mesDif;
    this.labelAno = this.anoDif;
    this.consultarDespesas(this.anoDif,this.mesDif)
  }

  openPageFuncoes(){
    this.navCtrl.push(FuncoesPage, {
        anoParam : this.labelAno
    });
  }

  openPagePesquisa(){
    this.navCtrl.push(DespesafiltrosPage);
  }

  consultarDespesas(anoParam, mesParam){

    let loader = this.loadingCtrl.create();

  loader.present().then(() => {

      let strParam = 'anoDotacao='+ anoParam + '&mesDotacao='  + mesParam;

        this.despesasServico.getDespesasProvider(strParam)
        .then((res) => {
          if (res) {

            this.objDespesas = res;

            this.valOrcadoInicio = this.objDespesas.lstDespesas[0].valOrcadoInicial;
            this.valOrcadoAtual = this.objDespesas.lstDespesas[0].valOrcadoAtualizado;
            this.valRealizado = this.objDespesas.lstDespesas[0].valPagoExercicio;


            this.carregarGrafico();
            loader.dismiss();
          }
        }, (error) => {
          console.log('2', error);
          loader.dismiss();
        })
        })
  }

  /*amountChange() {
    this.amount = this.utils.detectAmount(this.amount);
  }*/

}
