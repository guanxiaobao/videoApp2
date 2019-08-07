import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Brightness } from '@ionic-native/brightness/ngx';
import { timeout } from 'q';
import { Color } from '@ionic/core';
@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})
export class TestpagePage implements OnInit {

  public startX = 0; // 手指滑动开始x
  public startY = 0; // 手指滑动开始y
  public startT: number; // 手指滑动开始时间
  public isMove = false; // 是否滑动
  public brightnessValue: any = 0.0;
  public vioceValue: any = 0.0;
  private value: any = 0.0;

  public RangColor: Color;
  public voiceVisible: boolean = false;

  public ioclist: any[] = ['sunny', 'volume-high', 'volume-low', 'volume-mute', 'volume-off'];


  @ViewChild('rangdiv') rangdiv: ElementRef;

  constructor(
    private brightness: Brightness) { }

  ngOnInit() {
  }


  onTouchMove(event: any,type:string) {

    const touch = event.touches[0];
    const deltaX = touch.pageX - this.startX;
    const deltaY = touch.pageY - this.startY;
    this.rangdiv.nativeElement.style.opacity = 1;
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
      // 按下位置在屏幕右半边设置声音  左边设置屏幕亮度
      if (this.startX > screen.width / 2) {
        this.voiceVisible = true;
        const value = this.brightnessValue - (deltaY * 0.005);
        console.log(`设置声音大小 ${value}`);
      } else {
        const value = this.vioceValue - (deltaY * 0.005);
        console.log(`设置亮度 ${value}`);
      }
    }
  }

  onTouchEnd(event: any,type:string) {
    this.value = this.brightnessValue;
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
    this.brightnessValue = 0.0;
    this.vioceValue = 0.0;
    this.isMove = false;
  }

  rangeChange(event: any) {
  }
}
