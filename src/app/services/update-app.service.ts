import { Injectable } from '@angular/core';
import { CodePush, SyncStatus } from '@ionic-native/code-push/ngx';

@Injectable({
  providedIn: 'root'
})
export class UpdateAppService {

  constructor(private codePush: CodePush) { }

  CheckAppUpade() {
    this.codePush.sync({
      updateDialog: {
        updateTitle: '应用升级',
        optionalUpdateMessage: '检测到程序升级可用是否升级应用',
        optionalInstallButtonLabel: '升级',
        optionalIgnoreButtonLabel: '忽略',
      }
    }, this.OnProgress);
  }


  CheckForUpdate() {
    this.codePush.notifyApplicationReady(this.onNotifySucceeded, this.onNotifyFailed);
    this.codePush.checkForUpdate(this.onUpdateCheck, this.onError);
  }


  private onUpdateCheck(update) {

    if (!update) {
      console.log('The app is up to date.');
    } else {
      if (!update.failedInstall) {
        console.log('There is an update available. Remote package:' + JSON.stringify(update));
        console.log('A CodePush update is available. Package hash: ' + update.packageHash);
        update.download(this.onPackageDownloaded, this.onError, this.OnProgress);
      } else {
        console.log('The available update was attempted before and failed.');
      }
    }
  }

  private onError(error) {
    console.log('An error occurred. ' + error);
  }
  private onInstallSuccess() {
    console.log('Installation succeeded.');
  }

  private onNotifySucceeded() {
    console.log('NotifySucceeded.');
  }

  private onNotifyFailed(error) {
    console.log('NotifyFailed. ' + error);
  }


  private onPackageDownloaded(localPackage) {
    console.log('Package downloaded at: ' + localPackage.localPath);
    console.log('localPackage appVersion: ' + localPackage.appVersion);
    console.log('localPackage description: ' + localPackage.description);
    console.log('localPackage failedInstall: ' + localPackage.failedInstall);
    console.log('localPackage isFirstRun: ' + localPackage.isFirstRun);
    console.log('localPackage isMandatory: ' + localPackage.isMandatory);
    // InstallMode.IMMEDIATE: 立即更新APP
    // InstallMode.ON_NEXT_RESTART: 到下一次启动应用时更新
    // InstallMode.ON_NEXT_RESUME: 当应用从后台返回时更新
    localPackage.install(this.onInstallSuccess, this.onError, {
      installMode: InstallMode.ON_NEXT_RESUME,
      mandatoryInstallMode: InstallMode.ON_NEXT_RESTART
    });
  }


  private SyncStatus(status: any) {
    switch (status) {
      case SyncStatus.UP_TO_DATE:
        console.log('UP_TO_DATE');
        break;
      case SyncStatus.UPDATE_INSTALLED:
        console.log('UPDATE_INSTALLED');
        break;
      case SyncStatus.UPDATE_IGNORED:
        console.log('UPDATE_IGNORED');
        break;
      case SyncStatus.IN_PROGRESS:
        console.log('IN_PROGRESS');
        break;
      case SyncStatus.CHECKING_FOR_UPDATE:
        console.log('CHECKING_FOR_UPDATE');
        break;
      case SyncStatus.AWAITING_USER_ACTION:
        console.log('AWAITING_USER_ACTION');
        break;
      case SyncStatus.DOWNLOADING_PACKAGE:
        console.log('DOWNLOADING_PACKAGE');
        break;
      case SyncStatus.INSTALLING_UPDATE:
        console.log('INSTALLING_UPDATE');
        break;
      case SyncStatus.ERROR:
        console.log('ERROR');
        break;
    }
  }

  private OnProgress(downloadProgress) {
    console.log('Downloading ' + downloadProgress.receivedBytes + ' of ' + downloadProgress.totalBytes + ' bytes.');
  }
}
