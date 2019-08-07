import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppMinimize } from '@ionic-native/app-minimize/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  private backButtonPress = false;
  private customBackButton: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appmin: AppMinimize,
    private toast: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('＃33000000');
      this.splashScreen.hide();
      this.registerBackButtonAction();
    });
  }



  registerBackButtonAction() {
    console.log('监听返回按键');
    this.customBackButton = this.platform.backButton.subscribeWithPriority(999999, () => {
      this.showExit();
    });
    console.log(this.customBackButton);
  }

  async showExit() {
    console.log('推出键');
    if (this.backButtonPress) {
      this.appmin.minimize();
    } else {
      const toas = await this.toast.create({
        message: '再按一次退出应用',
        duration: 2000
      });
      toas.present();
      this.backButtonPress = true;
    }

    setTimeout(() => {
      this.backButtonPress = false;
      console.log('重置backbuttonpress');
    }, 2000);
  }

  // 卸载 事件
  ionViewDidLeave() {
    console.log('销毁');

    if (this.customBackButton) {
      this.customBackButton.unsubscribe();
    }
  }
}

