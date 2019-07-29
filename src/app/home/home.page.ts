import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { identifierModuleUrl } from '@angular/compiler';
declare var videojs: any;
import * as $ from 'jquery';


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
  public move: any;

  private OnSceenChanged: any;
  // constructor() {
  //   this.show = true;
  // }
  constructor(private rout: ActivatedRoute,
    private screenOrientation: ScreenOrientation) {

  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {

    this.rout.queryParams.subscribe((data) => {
      this.move = data;
      this.play();
    });
    console.log('屏幕方向');
    console.log(this.screenOrientation.type);
    this.OnSceenChanged = () => {
      console.log('屏幕翻转21');
      console.log(screen.orientation.type);
    };
    screen.orientation.addEventListener('change', this.OnSceenChanged);

    document.addEventListener('fullscreenchange', () => {
      console.log('视频全屏' + this.player.isFullscreen());
      // if (this.player.isFullscreen()) {
      //   screen.orientation.lock('landscape-primary');
      // } else {
      //   screen.orientation.unlock();
      // }
    });
    document.onfullscreenchange = () => {
      console.log('视频全屏2' + this.player.isFullscreen());
    };
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

        break;
      case 'landscape-secondary': // 次要横向模式
        this.player.exitFullscreen();
        this.player.isFullscreen(true);

        break;
      case 'lportrait-primary': // 纵向模式
        this.player.exitFullscreen();
        break;
      case 'portrait-secondary': // 次要纵向模式
        break;
    }
  }


}
