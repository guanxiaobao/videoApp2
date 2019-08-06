import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { identifierModuleUrl } from '@angular/compiler';
declare var videojs: any;
import * as $ from 'jquery';
import { Move } from '../modes/move';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, ToastController } from '@ionic/angular';

import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public url: string;

  public type: string;

  public show: boolean;
  public player: any;
  public move: Move;
  public tiele = '';
  public showHeader: boolean = true;
  private OnSceenChanged: any;

  private customBackButton: any;
  public decelement;
  public backButtonevent: any;
  private backButtonPress = 0;
  // constructor() {
  //   this.show = true;
  // }
  constructor(
    private rout: ActivatedRoute,
    private rout2: Router,
    private screenOrientation: ScreenOrientation,
    private stausbar: StatusBar,
    private appmin: AppMinimize,
    private toast: ToastController,
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private insomnia: Insomnia) {
    this.rout.queryParams.subscribe((data: Move) => {
      this.move = data;
      this.tiele = this.move.name;
      this.play();
      this.backgroundMode.enable();
    });
  }


  ngOnInit(): void {
    screen.orientation.onchange = (e) => {
      console.log(e);

      this.SetPlayOrientation();
    };

    document.addEventListener('fullscreenchange', () => {

      console.log('doc视频全屏' + this.player.isFullscreen());
      console.log(this.isFullScreen());
      if (this.player.isFullscreen() && this.isFullScreen()) {
        screen.orientation.lock('landscape-primary');
        console.log('切换横屏');
      } else {
        screen.orientation.unlock();
        console.log('取消横屏');
      }
    });

    this.registerBackButtonAction();
  }

  isFullScreen() {
    const doc: any = document;
    return doc.isFullScreen || doc.mozIsFullScreen || doc.webkitIsFullScreen;
  }
  play() {
    const data = {
      src: this.move.address,
      type: this.move.type,
      withCredentials: true
    };
    console.log(data);
    this.player = videojs('myvideo');
    this.player.src(data);
    this.player.play();

    this.player.on('fullscreenchange', () => {
      console.log('player 全屏更改');
    });

    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
  }




  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    this.player.dispose();
    screen.orientation.removeEventListener('change', this.OnSceenChanged);
  }

  private SetPlayOrientation() {
    const orientation = screen.orientation.type;
    switch (orientation) {
      case 'landscape-primary': // 横向模式
        this.SetFullScreen(true);
        break;
      case 'landscape-secondary': // 次要横向模式
        this.SetFullScreen(true);
        break;
      case 'portrait-primary': // 纵向模式
        this.SetFullScreen(false);
        break;
      case 'portrait-secondary': // 次要纵向模式
        this.SetFullScreen(false);
        break;
      default:
        console.log('设置default全屏' + this.player.isFullscreen());
        break;
    }
  }

  private async SetFullScreen(isFullscreen: boolean) {
    if (isFullscreen) {
      this.showHeader = false;
      this.stausbar.hide();
    } else {
      this.stausbar.show();
      this.showHeader = true;
    }
  }

  onClick() {
    if (this.player.isFullscreen()) {
      this.player.exitFullscreen();
    } else {
      this.player.requestFullscreen();
    }
  }


  registerBackButtonAction() {
    console.log('监听返回按键');
    this.customBackButton = this.platform.backButton.subscribeWithPriority(999999, () => {
      console.log('点击返回按钮');
      if (this.player.isFullscreen()) {
        screen.orientation.lock('portrait-primary');
        screen.orientation.unlock();
      } else {
        this.rout2.navigateByUrl('main');
      }
    });
    console.log(this.customBackButton);
  }

  // 卸载 事件
  ionViewDidLeave() {
    console.log('销毁');
    if (this.customBackButton) {
      this.customBackButton.unsubscribe();
    }
  }
}
