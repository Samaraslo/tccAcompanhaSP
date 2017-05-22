import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Contratos } from '../pages/contratos/contratos';
import { Credores }  from '../pages/credores/credores';
import { ModalFiltros } from '../pages/modal-filtros/modal-filtros';
import { Page2 } from '../pages/page2/page2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Mensagens } from '../global/mensagens';
import { DetalhesContrato } from '../pages/detalhes-contrato/detalhes-contrato';
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { GraficoContratos } from '../pages/grafico-contratos/grafico-contratos';
import { FormFaleConoscoPage } from '../pages/form-fale-conosco/form-fale-conosco';
import { DespesasPage } from '../pages/despesas/despesas';
import { FuncoesPage } from '../pages/funcoes/funcoes';
import { DespesafiltrosPage } from '../pages/despesafiltros/despesafiltros';
//import '../pages/despesas/jsConvert.js'; 

import { Utils } from '../global/util';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Contratos,
    Credores,
    ModalFiltros,
    Page2,
    DetalhesContrato,
    GraficoContratos,
    FormFaleConoscoPage,
    DespesasPage,
    FuncoesPage,
    DespesafiltrosPage
    ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Contratos,
    Credores,
    ModalFiltros,
    Page2,
    DetalhesContrato,
    GraficoContratos,
    FormFaleConoscoPage,
    DespesasPage,
    FuncoesPage,
    DespesafiltrosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Mensagens,
    Utils,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
