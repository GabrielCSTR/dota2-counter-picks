import { Component } from '@angular/core';

import { LoadingController, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private menu: MenuController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  activePath = '';

  pages = [
    {
      name: 'Home',
      path: './pages/home',
      icon: 'home-outline'
    },
    {
      name: 'Users',
      path: './pages/home',
      icon: 'people-circle-outline'
    },
    {
      name: 'Register',
      path: '/pages/home',
      icon: 'person-add-outline'
    },
    {
      name: 'Lobby',
      path: '/pages/home',
      icon: 'list-outline'
    },
    {
      name: 'Raking',
      path: '/pages/home',
      icon: 'newspaper-outline'
    }
    
  ]

  async logout() {
    await this.presentLoading();

    try {
      this.menu.toggle();
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }
}
