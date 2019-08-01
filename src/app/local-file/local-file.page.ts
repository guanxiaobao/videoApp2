import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Move } from '../modes/move';

@Component({
  selector: 'app-local-file',
  templateUrl: './local-file.page.html',
  styleUrls: ['./local-file.page.scss'],
})
export class LocalFilePage implements OnInit {

  public movietype: any[] = ['mp4', 'mkv', '3gp', 'avi', 'mov', 'rmvb', 'rm', 'flv'];
  public fileName = 'movies';
  public movies: Move[] = [];
  constructor(private file: File) { }

  ngOnInit() {
  }

  onClick() {
    let data = this.file.listDir(this.file.externalRootDirectory, '');
    data.then((a) => {
      this.movies = [];
      console.log(a);
      this.FindMovies(a);
    }).catch(err => {
      console.log(err);

    });
  }


  FindMovies(files: any[]) {
    files.forEach(element => {
      if (element.isDirectory) {
        console.log('开始检测文件夹' + element);
        console.log(element);

        this.file.listDir(this.file.externalRootDirectory, element.fullPath.replace('/', '')).then((es: any[]) => {
          console.log('开始检测文件夹2' + es);
          console.log(es);

          this.FindMovies(es);
        }).catch(err => console.log(err));
        if (element.isFile) {
          console.log('开始检测文件' + element);
          console.log(element);

          const ele = this.movietype.find(a => element.fullPath.toLocaleLowerCase().endsWith(a));
          if (ele != null && ele != undefined) {
            console.log(ele);
            const ex = ele.split('.').pop();
            this.movies.push(new Move(element.nativeURL, `video/${ex}`, 'local', element.name));
          }
        }
      }
    });
    return null;
  }



}
