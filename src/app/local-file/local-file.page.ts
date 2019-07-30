import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-local-file',
  templateUrl: './local-file.page.html',
  styleUrls: ['./local-file.page.scss'],
})
export class LocalFilePage implements OnInit {

  constructor(private file: File) { }

  ngOnInit() {

    var data = this.file.listDir(this.file.dataDirectory, 'move');
    console.log(data);

    data.then((ss) => console.log(ss));
  }

}
