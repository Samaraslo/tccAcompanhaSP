import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-form-fale-conosco',
  templateUrl: 'form-fale-conosco.html'
})
export class FormFaleConoscoPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder
  //  private emailComposer: EmailComposer
  ) {
    this.myForm = this.createMyForm();
  }

  saveData(){
    console.log(this.myForm.value);
  }

  /*sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
      let email = {
        to: 'samara_slo@hotmail.com',
        cc: 'erika@mustermann.de',
        bcc: ['john@doe.com', 'jane@doe.com'],
        attachments: [
          'file://img/logo.png',
          'res://icon.png',
          'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
          'file://README.pdf'
        ],
        subject: 'Cordova Icons',
        body: 'How are you? Nice greetings from Leipzig',
        isHtml: true
      };

      // Send a text message using default options
      this.emailComposer.open(email);
     }
    });
  }*/


  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      gender: ['', Validators.required],
      msgForm: ['', Validators.required],
      subject:['', Validators.required],
    });
  }
}
