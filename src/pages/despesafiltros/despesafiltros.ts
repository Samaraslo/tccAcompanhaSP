import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-despesafiltros',
  templateUrl: 'despesafiltros.html'
})
export class DespesafiltrosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DespesafiltrosPage');
  }

}
