import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-h5-video',
  templateUrl: './h5-video.page.html',
  styleUrls: ['./h5-video.page.scss'],
})
export class H5VideoPage implements OnInit {

  constructor(private streamingMedia: StreamingMedia) { }

  ngOnInit() {

    const options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played'); },
      errorCallback: (e) => { console.log('Error streaming'); },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };
    this.streamingMedia.playVideo('http://clips.vorwaerts-gmbh.de/VfE_html5.mp4', options);
    // const vidURL = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
    // const myVideo = document.getElementsByTagName('video')[0];
    // myVideo.src = vidURL;
    // myVideo.load();
    // myVideo.play();
  }

}
