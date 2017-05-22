import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Mensagens } from '../../global/mensagens';
import { FormFaleConoscoPage } from '../form-fale-conosco/form-fale-conosco'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Mensagens]

})
export class HomePage {
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: Mensagens,
              private alertCtrl: AlertController) {


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  openModalSobreApp(){
    let alert = this.alertCtrl.create({
      title: this.global.msgTituloSobreOAPP,
      subTitle: this.global.msgConteudoSobreOAPP,
      buttons: ['OK, entendi! :) ']
    });
    alert.present();
  }

  openFormFaleConosco(){
    this.navCtrl.push(FormFaleConoscoPage);
  }

}
