import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { FormFaleConoscoPage } from '../pages/form-fale-conosco/form-fale-conosco';
import { Contratos } from '../pages/contratos/contratos';
import { Credores } from '../pages/credores/credores';
import { ModalFiltros } from '../pages/modal-filtros/modal-filtros';
import { Page2 } from '../pages/page2/page2';
//import { ContratosService } from '../../providers/contratos-service';
//import { CredoresService } from '../../providers/credores-service';
//import { DetalhesContrato } from '../pages/detalhes-contrato/detalhes-contrato';
import { Mensagens } from '../global/mensagens';
//import { GraficoContratos } from '../pages/grafico-contratos/grafico-contratos';
import { DespesasPage } from '../pages/despesas/despesas';
import { FuncoesPage } from '../pages/funcoes/funcoes';


@Component({
  templateUrl: 'app.html',
  providers: [Mensagens]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  icons:string[];
  rootPage: any = HomePage;

  pages: Array<{icon:string,title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.icons = ['home', 'paper', 'clipboard', 'trending-down', 'logo-usd', 'trending-up',
    'pricetags', 'pulse'];

    // used for an example of ngFor and navigation
    this.pages = [
      {icon: this.icons[0], title: 'Início', component: HomePage },
      {icon: this.icons[1], title: 'Contratos', component: Contratos },
      {icon: this.icons[2], title: 'Despesas', component: DespesasPage },
      {icon: this.icons[3], title: 'Credores da Despesa', component: FuncoesPage },
      {icon: this.icons[4], title: 'Credores de Contrato', component: Credores },
      {icon: this.icons[5], title: 'Empenho', component: Page2 },
      {icon: this.icons[6], title: 'Liquidação', component: Page2 },
      {icon: this.icons[7], title: 'Movimentos da Receita', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
