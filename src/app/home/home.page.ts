import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { identifierModuleUrl } from '@angular/compiler';
declare var videojs: any;
import * as $ from 'jquery';
import { Move } from '../modes/move';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  public url: string;

  public type: string;

  public show: boolean;
  public player: any;
  public move: Move;
  public tiele = '';
  private OnSceenChanged: any;
  // constructor() {
  //   this.show = true;
  // }
  constructor(
    private rout: ActivatedRoute,
    private screenOrientation: ScreenOrientation,
    private stausbar: StatusBar) {
    this.rout.queryParams.subscribe((data: Move) => {
      this.move = data;
      this.tiele = this.move.name;
      this.play();
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {

    console.log('屏幕方向');
    console.log(this.screenOrientation.type);
    this.OnSceenChanged = () => {
      console.log('屏幕翻转21');
      console.log(screen.orientation.type);
      this.SetPlayOrientation(screen.orientation.type);
    };
    screen.orientation.addEventListener('change', this.OnSceenChanged);

    document.addEventListener('fullscreenchange', () => {
      console.log('视频全屏' + this.player.isFullscreen());
      if (this.player.isFullscreen()) {
        screen.orientation.lock('landscape-primary');
      } else {
        screen.orientation.unlock();
      }
    });
  }

  play() {
    const data = {
      src: this.move.address,
      type: this.move.type,
      withCredentials: true
    };
    console.log(data);
    this.player.src(data);
    this.player.play();

    // tslint:disable-next-line: prefer-const
    let btn = $('button[title=\'Fullscreen\']')[0];
    btn.addEventListener('click', () => {
      console.log('evssssssssssssssssssssssssssssssent');
    });
    console.log(btn);


    this.player.on('fullscreenchange', function (ev) {
      console.log('全屏触发');
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.player = videojs('myvideo');
  }

  eventTriggered(e) {
    console.log('event:' + e.type);
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    this.player.dispose();
    screen.orientation.removeEventListener('change', this.OnSceenChanged);
  }

  screenChange() {
    console.log('视频全屏');
    console.log(this.player.isFullscreen());
  }

  onresize() {
    console.log('视频全屏');
    console.log(this.player.isFullscreen());
  }
  private SetPlayOrientation(orientation: string) {
    switch (orientation) {
      case 'landscape-primary': // 横向模式
        this.player.exitFullscreen();
        this.player.isFullscreen(true);
        this.stausbar.overlaysWebView(true);
        break;
      case 'landscape-secondary': // 次要横向模式
        this.player.exitFullscreen();
        this.player.isFullscreen(true);
        this.stausbar.overlaysWebView(true);
        break;
      case 'lportrait-primary': // 纵向模式
        this.player.exitFullscreen();
        this.stausbar.overlaysWebView(false);
        break;
      case 'portrait-secondary': // 次要纵向模式
        break;
    }
  }


}
