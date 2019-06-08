import { IonicModule, NavController } from '@ionic/angular';
import { UsuarioPage } from './../usuario/usuario.page';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  abrirUsuario() {
    this.navCtrl.push(UsuarioPage);
  }

}
