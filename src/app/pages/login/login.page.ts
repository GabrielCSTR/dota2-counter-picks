import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {};
  private loading: any;
  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {

      let message: string;

      switch (error.code) {
        //Validação dos dados informados
        case 'auth/argument-error':
          message = 'E-mail/Password não foi informado, Por favor informe todos os campos';
          break;
        //Verifica se o formato do E-mail é valido
        case 'auth/invalid-email':
          message = 'O formato do E-mail informado é invalido, Por favor informe um E-mail valido';
          break;
        //Validação do password
        case 'auth/wrong-password':
          message = 'Senha invalida, Por favor informe sua senha novamente.';
          break;
        case 'auth/user-not-found':
          message = 'Usuario não existe, Por favor informe uma conta existente.';
          break;
      }

      this.presentToast(message);

      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor, aguarde...'
    });

    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
