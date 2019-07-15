
window.document.addEventListener('deviceready', function () {

    // reference: https://github.com/Microsoft/cordova-plugin-code-push#syncoptions
    window.codePush.sync(syncStatus, {
        updateDialog: true,
        installMode: InstallMode.IMMEDIATE,
        updateDialog: {
            updateTitle: "An update is available!",
            optionalUpdateMessage: "Message",
            optionalInstallButtonLabel: "Install Button",
            optionalIgnoreButtonLabel: "Ignore Button",
        }
    }, onProgress);
    
    // reference: https://github.com/Microsoft/cordova-plugin-code-push#syncstatus
    function syncStatus(status) {
        switch (status) {
            case SyncStatus.UP_TO_DATE:
                console.log("UP_TO_DATE");
                break;
            case SyncStatus.UPDATE_INSTALLED:
                console.log("UPDATE_INSTALLED");
                break;
            case SyncStatus.UPDATE_IGNORED:
                console.log("UPDATE_IGNORED");
                break;
            case SyncStatus.IN_PROGRESS:
                console.log("IN_PROGRESS");
                break;
            case SyncStatus.CHECKING_FOR_UPDATE:
                console.log("CHECKING_FOR_UPDATE");
                break;
            case SyncStatus.AWAITING_USER_ACTION:
                console.log("AWAITING_USER_ACTION");
                break;
            case SyncStatus.DOWNLOADING_PACKAGE:
                console.log("DOWNLOADING_PACKAGE");
                break;
            case SyncStatus.INSTALLING_UPDATE:
                console.log("INSTALLING_UPDATE");
                break;
            case SyncStatus.ERROR:
                console.log("ERROR");
                break;
        }
    } 

    function onProgress(downloadProgress) {
        console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
    };
})
