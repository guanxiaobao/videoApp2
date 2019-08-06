import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';   // Ionic 睡眠 Insomnia插件的安装(Installation)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    ScreenOrientation,
    CodePush,
    File,
    AppMinimize,
    WebView,
    VideoEditor,
    BackgroundMode,
    Insomnia,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
