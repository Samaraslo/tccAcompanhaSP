import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
      /*  tooltips:{
          callbacks:{
            label: function(tooltipItem, data){

              return this.convertToMoney(data.datasets[tooltipItem.datasetIndex].data);

            }
          }
        },*/
          scales: {
              yAxes: [{
                  ticks: {

                      beginAtZero:false
                    }
              }]
          }
      }

    });
  }

  convertToMoney(value){
    let num = value.toFixed(2);
    num = num.replace(".",",");
    return 'R$' + num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
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
  console.log('0');
  //anoParam = this.myYear;
  //mesParam = this.myMonth;
  console.log('anoParam' + anoParam + 'mesParam' + mesParam);

      let strParam = 'anoDotacao='+ anoParam + '&mesDotacao='  + mesParam;

        this.despesasServico.getDespesasProvider(strParam)
        .then((res) => {
          if (res) {
            this.objDespesas = res;

            console.log('1', this.objDespesas);

            this.valOrcadoInicio = this.objDespesas.lstDespesas[0].valOrcadoInicial;
            this.valOrcadoAtual = this.objDespesas.lstDespesas[0].valOrcadoAtualizado;
            this.valRealizado = this.objDespesas.lstDespesas[0].valPagoExercicio;
            console.log('11 valOrcadoInicio'+ this.valOrcadoInicio + 'valOrcadoAtual' + this.valOrcadoAtual + 'valRealizado' + this.valRealizado);

            let value =  this.objDespesas.lstDespesas[0].valOrcadoInicial;
            let num = value.toFixed(2);
            num = num.replace(".",",");

            let value2 =  this.objDespesas.lstDespesas[0].valOrcadoAtual;
            let num2 = value.toFixed(2);
            num2 = num2.replace(".",",");

            let value3 =  this.objDespesas.lstDespesas[0].valRealizado;
            let num3 = value.toFixed(2);
            num3 = num3.replace(".",",");

            this.valOrcadoInicioFormat = num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            this.valOrcadoAtualFormat = num2.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
            this.valRealizadoFormat = num3.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");


            console.log('22 valOrcadoInicioFormat'+ this.valOrcadoInicioFormat + 'valOrcadoAtual' + this.valOrcadoAtualFormat + 'valRealizado' + this.valRealizadoFormat);
              this.carregarGrafico();
          }
        }, (error) => {
          console.log('2', error);
        })
  }

  /*amountChange() {
    this.amount = this.utils.detectAmount(this.amount);
  }*/

}
