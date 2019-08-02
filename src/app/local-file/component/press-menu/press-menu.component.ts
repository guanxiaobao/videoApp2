import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';
import { Move } from 'src/app/modes/move';
import { File, Entry } from '@ionic-native/file/ngx';




@Component({
  selector: 'app-press-menu',
  templateUrl: './press-menu.component.html',
  styleUrls: ['./press-menu.component.scss'],
})
export class PressMenuComponent implements OnInit {

  public movie: Move;
  constructor(
    private params: NavParams,
    private pop: PopoverController,
    private file: File,
    private alert: AlertController) {

  }

  ngOnInit() {
    this.movie = JSON.parse(this.params.data.tostring());
    console.log(this.movie);

  }

  async OnDelete() {
    if (this.movie != null) {
      const msg = await this.alert.create({
        header: '提示',
        message: `是否删除视频 ${this.movie.name}`,
        buttons: [{
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alert.dismiss();
          }
        }, {
          text: '确定',
          handler: (blah) => this.delete(this.movie.Entry)
        }]
      });

    }
  }


  delete(path: Entry) {
    path.remove(async () => {
      const scss = await this.alert.create({
        header: '提示',
        message: `${path.name}删除成功。`
      });
      scss.present();

    }, async (err) => {
      const scss = await this.alert.create({
        header: '删除失败',
        message: err.message
      });
      scss.present();
    });
  }
}
