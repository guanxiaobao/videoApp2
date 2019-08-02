import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { File, Entry } from '@ionic-native/file/ngx';
import { Move } from '../modes/move';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { PressMenuComponent } from './component/press-menu/press-menu.component';


@Component({
  selector: 'app-local-file',
  templateUrl: './local-file.page.html',
  styleUrls: ['./local-file.page.scss'],
})
export class LocalFilePage implements OnInit {

  public movietype: any[] = ['mp4', 'ogg', 'webm', 'flv'];
  public movietypefull: any[] = ['mp4', 'ogg', 'webm', 'mkv', '3gp', 'avi', 'mov', 'rmvb', 'rm', 'flv'];

  public fileName = 'movies';
  public movies: Move[] = [];
  constructor(
    private file: File,
    private webView: WebView,
    private videoEditor: VideoEditor,
    private pop: PopoverController) { }

  ngOnInit() {
    // this.movies.push(new Move(
    //   'http://ivi.bupt.edu.cn/hls/gdhd.m3u8',
    //   'rtmp/mp4',
    //   'Movie',
    //   '广东卫视高清',
    //   'https://tse4-mm.cn.bing.net/th?id=OIP.spSgy11K4hcwc48ZecoqyAHaIM&w=202&h=217&c=7&o=5&pid=1.7'
    // ));
    // this.movies.push(new Move(
    //   'http://ivi.bupt.edu.cn/hls/gdhd.m3u8',
    //   'rtmp/mp4',
    //   'Movie',
    //   '广东卫视高清',
    //   'https://tse4-mm.cn.bing.net/th?id=OIP.spSgy11K4hcwc48ZecoqyAHaIM&w=202&h=217&c=7&o=5&pid=1.7'
    // ));
    this.onReadLocalMovies();
  }

  onReadLocalMovies() {
    const data = this.file.listDir(this.file.externalRootDirectory, '');
    data.then((a) => {
      this.movies = [];
      console.log(a);
      this.FindMovies(a);
    }).catch(err => {
      console.log(err);
    });
  }


  FindMovies(files: any[], deep = 0) {
    files.forEach(async element => {
      if (element.isDirectory) {
        this.file.listDir(this.file.externalRootDirectory, element.fullPath.replace('/', '')).then((es: any[]) => {
          if (es.length > 0 && deep < 2) {
            console.log(`${deep} 开始检索${es}`);
            this.FindMovies(es, deep++);
          }
        }).catch(err => console.log(err));
      }
      if (element.isFile) {
        console.log('开始检测文件' + element);
        console.log(element);

        const ele = this.movietype.find(a => element.fullPath.toLocaleLowerCase().endsWith(a));
   
        if (ele != null && ele != undefined) {
          console.log(ele);
          const ex = ele.split('.').pop();
          const url = this.webView.convertFileSrc(element.nativeURL);
          console.log(url);
          let outpath = '';
          await this.GetVideoThumbnail(element.nativeURL, element.name).then(a => {
            console.log(`接受缩略图：${a}`);
            outpath = a;
          });
          const outurl = this.webView.convertFileSrc(outpath);
          console.log(outurl);
          let movie=new Move(url, `video/${ex}`, 'local', element.name, outurl, ele.fullPath);
          movie.Entry=element;
          this.movies.push(movie);
        }
      }
    });
    return null;
  }

  async GetVideoThumbnail(videoPath: string, outputFile: string) {

    let path = '';
    await this.videoEditor.createThumbnail({
      fileUri: videoPath,
      outputFileName: outputFile,
      atTime: 3,
      width: 320,
      height: 480,
      quality: 100
    }).then(a => {
      path = a;
    });
    console.log(`缩略图路径：${path}`);
    return path;
  }

  async LongPress(item: any) {
    console.log('长安');
    const popover = await this.pop.create({
      component: PressMenuComponent,
      componentProps: item.Entry,
      translucent: true
    });
    return await popover.present();
  }
}
