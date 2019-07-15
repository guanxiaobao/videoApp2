import { Component, OnInit } from '@angular/core';
import { UpdateAppService } from "../services/update-app.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public adr: string;

  public listAdd: any[] = [];
  constructor(private update:UpdateAppService) { }

  ngOnInit() {
    this.adr = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8';

    this.listAdd.push({
      address: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
      type: 'application/x-mpegURL',
      tag: 'Movie',
      name: 'CCTV1'
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


  onCheckUpdate(){
    this.update.CheckForUpdate();
  }
}
