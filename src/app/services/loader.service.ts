import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }

  async showHideAutoLoader() {
    // Dismiss all pending loaders before creating the new one
    await this.dismiss();
    
    let options: LoadingOptions = {
      cssClass: 'custom-loading',
      duration: 5000,
      spinner: null,
    };
    
    await this.loadingController  
      .create(options)
      .then(res => {
        res.present();
    });
  }
    
  /**
  * Dismiss all the pending loaders, if any
  */
  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

}
