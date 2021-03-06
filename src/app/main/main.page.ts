import { Component, OnInit } from '@angular/core';
import { UpdateAppService } from '../services/update-app.service';
import { Move } from '../modes/move';
import { Brightness } from '@ionic-native/brightness/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public adr: string;

  public listAdd: Move[] = [];
  public liang: any;
  constructor(
    private update: UpdateAppService,
    private brightness: Brightness) { }

  ngOnInit() {
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CCTV1'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CCTV3'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CCTV6'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CCTV5'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/cctv8hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CCTV8'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/chchd.m3u8',
      'application/x-mpegURL',
      'Movie',
      'CHC高清电影'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/btv1hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      '北京卫视高清'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/btv11hd.m3u8',
      'application/x-mpegURL',
      'Movie',
      '北京纪实高清'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/hunanhd.m3u8',
      'application/x-mpegURL',
      'Movie',
      '湖南卫视高清'
    ));
    this.listAdd.push(new Move(
      'http://ivi.bupt.edu.cn/hls/zjhd.m3u8',
      'application/x-mpegURL',
      'Movie',
      '浙江卫视高清'
    ));
  }

  toPlay(item: any) {


  }

  onCheckUpdate() {
    this.update.CheckForUpdate();
  }


  liangdu() {
    this.brightness.setBrightness(this.liang);
    console.log(`设置亮度：${this.liang}`);
    console.log(`当前亮度${this.brightness.getBrightness()}`);

  }
  shengyin() {

  }
}
