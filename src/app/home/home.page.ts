import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import 'hammerjs';
import { Brightness } from '@ionic-native/brightness/ngx';
import { Media } from '@ionic-native/media/ngx';


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
  public showHeader: boolean = true; // 是否显示标题
  private OnSceenChanged: any;
  private customBackButton: any;
  public decelement;

  public backButtonevent: any;  // 返回按钮事件

  public startX = 0; // 手指滑动开始x
  public startY = 0; // 手指滑动开始y
  public startT: number; // 手指滑动开始时间
  public isMove = false; // 是否滑动
  public brightnessValue: any; // 屏幕亮度
  public vioceValue: any = 0.0; // 播放声音
  public RangColor = 'primary';      // 滑块颜色
  public rangvalue: any = 0.0;   // 滑动计算值

  public ioclist: any[] = ['sunny', 'volume-mute', 'volume-low', 'volume-high', 'volume-off'];
  public iocName = 'volume-low';

  @ViewChild('rangdiv') rangdiv: ElementRef;
  @ViewChild('myvideo') myvideo: ElementRef;
  constructor(
    private rout: ActivatedRoute,
    private rout2: Router,
    private screenOrientation: ScreenOrientation,
    private stausbar: StatusBar,
    private appmin: AppMinimize,
    private toast: ToastController,
    private platform: Platform,
    private backgroundMode: BackgroundMode,
    private insomnia: Insomnia,
    private brightness: Brightness,
    private media: Media) {
    this.rout.queryParams.subscribe((data: Move) => {
      this.move = data;
      this.tiele = this.move.name;
      this.play();
      this.backgroundMode.enable();

    });
  }


  ngOnInit(): void {

    this.OnSceenChanged = (e) => {
      console.log(e);
      this.SetPlayOrientation();
    };

    screen.orientation.addEventListener('change', this.OnSceenChanged);

    document.addEventListener('fullscreenchange', () => {

      console.log('doc视频全屏' + this.player.isFullscreen());
      if (this.player.isFullscreen() && this.isFullScreen()) {
        screen.orientation.lock('landscape-primary');
        console.log('切换横屏');
      } else {
        screen.orientation.unlock();
        console.log('取消横屏');
      }
    });

    this.registerBackButtonAction();

    this.brightness.getBrightness().then((a) => {
      console.log(`屏幕亮度${a}`);
      this.brightnessValue = a;
    });

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
        this.rout2.navigateByUrl('tabs/main');
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


  onTouchMove(event: any, type: string) {

    console.log(type);

    const touch = event.touches[0];
    const deltaX = touch.pageX - this.startX;
    const deltaY = touch.pageY - this.startY;
    if (Math.abs(deltaX - deltaY) > 3) {
      this.isMove = true;
    }
    // 如果X方向上的位移大于Y方向，则认为是左右滑动
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      console.log(deltaX);
      // todo :设置播放进度
      if (deltaX > 0) {  // 判断手指滑动的方向// ? "right" : "left";
        console.log(deltaX);
      }
    } else {
      // 不全屏不执行 手势滑动
      if (this.player.isFullscreen() == 'false') {
        return;
      }

      this.rangdiv.nativeElement.style.opacity = 1;
      // 按下位置在屏幕右半边设置声音  左边设置屏幕亮度
      if (this.startX > screen.width / 2) {
        this.iocName = this.ioclist[1];

        this.rangvalue = this.vioceValue - (deltaY * 0.005);
        if (this.rangvalue > 1) {
          this.rangvalue = 1;
          this.iocName = this.ioclist[3];
          return;
        }
        if (this.rangvalue < 0) {
          this.rangvalue = 0;
          this.iocName = this.ioclist[4];
          return;
        }
        const index: number = (this.rangvalue / 0.34) + 1;
        this.iocName = this.ioclist[index.toString()[0]];
        console.log(`${index}    ${this.iocName}`);
        console.log(`设置声音大小 ${this.rangvalue}`);
        // this.myvideo.nativeElement.volume = this.rangvalue;
       // this.player.volume(this.rangvalue);
      // this.nativeAudio.setVolumeForComplexAsset()
      } else {
        this.iocName = this.ioclist[0];
        this.rangvalue = this.brightnessValue - (deltaY * 0.005);
        if (this.rangvalue > 1) {
          this.rangvalue = 1;
        }
        if (this.rangvalue < 0) {
          this.rangvalue = 0;
        }
        console.log(`设置亮度 ${this.rangvalue}`);
        this.brightness.setBrightness(this.rangvalue);
      }
    }
  }

  onTouchEnd(event: any, type: string) {
    if (this.rangdiv.nativeElement.style.opacity == '0') {
      return;
    }

    /// this.rangvalue = this.brightnessValue;
    let op = 1;
    const doc: any = document.getElementsByClassName('rangdiv');
    setTimeout(() => {
      const inter = setInterval(() => {
        op = op - 0.1;
        this.rangdiv.nativeElement.style.opacity = op;
        if (op <= 0) {
          clearInterval(inter);
        }
      }, 20);
    }, 500);
  }
  touchstart(event: any) {
    console.log('touchstart');

    console.log(event);
    console.log(event.touches[0]);
    const touch = event.touches[0];
    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.startT = new Date().getTime(); // 记录手指按下的开始时间
    console.log(`$按下坐标 ${this.startX}    ${this.startY}`);
    this.brightness.getBrightness().then(a => {
      this.brightnessValue = a;
    });

    this.vioceValue =  // this.myvideo.nativeElement.volume;
      this.rangvalue = 0;
    console.log(`获取声音大小${this.vioceValue}`);
    this.isMove = false;
  }
}
