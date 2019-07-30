import { Component, OnInit } from '@angular/core';
import { UpdateAppService } from '../services/update-app.service';
import { ActivatedRoute } from "@angular/router";
import { Move } from '../modes/move';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public adr: string;

  public listAdd: Move[] = [];
  constructor(private update: UpdateAppService,
      private rout:ActivatedRoute) { }

  ngOnInit() {
    this.listAdd.push({
      address: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: 'CCTV1'
    });
    this.listAdd.push({
      address: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: 'CCTV3'
    });
    this.listAdd.push({
      address: 'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: 'CCTV6'
    });
    this.listAdd.push({
      address: 'http://ivi.bupt.edu.cn/hls/gdhd.m3u8',
      type: 'rtmp/mp4',
      tag: 'Movie',
      name: '广东卫视高清'
    });
    this.listAdd.push({
      address: 'rtmp://58.200.131.2:1935/livetv/hunantv',
      type: 'rtmp/mp4',
      tag: 'Movie',
      name: '湖南卫视'
    });

    this.listAdd.push({
      address: 'rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: '韩国GoodTV'
    });
    this.listAdd.push({
      address: 'rtmp://ns8.indexforce.com/home/mystream',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: '美国1'
    });

    this.listAdd.push({
      address: 'http://www.w3school.com.cn/i/movie.mp4',
      type: 'video/mp4',
      tag: 'Movie',
      name: '普通mp4'
    });
    this.listAdd.push({
      address: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
      type: 'video/mp4',
      tag: 'Movie',
      name: '普通1mp4'
    });
  }

  toPlay(item: any) {


  }

  onCheckUpdate() {
    this.update.CheckForUpdate();
  }
}
