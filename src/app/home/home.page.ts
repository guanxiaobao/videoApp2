import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var videojs: any;



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
  // constructor() {
  //   this.show = true;
  // }
  constructor(private rout: ActivatedRoute) {

  }


  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    this.url = this.rout.snapshot.params.url;
    console.log(this.url);
    if (this.url.toLocaleLowerCase().endsWith('mp4')) {
      this.type = 'video/mp4';
    } else if (this.url.toLocaleLowerCase().endsWith('m3u8')) {
      this.type = 'application/x-mpegURL';
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.player = videojs('myvideo');
    let data = {
      src: this.url,
      type: this.type,
      withCredentials: true
    };  
      console.log(data);
    this.player.src(data);

    this.player.play();
  }


 
}
