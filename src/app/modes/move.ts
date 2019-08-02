import { Entry } from '@ionic-native/file/ngx';
export class Move {

    // 文件地址
    public address: string;
    // 播放类型
    public type: string;
    // 标签 在线/ 本地
    public tag: string;
    // 文件名
    public name: string;
    // 缩略图
    public thumbnail = '';

    public path: string = '';

    public Entry: Entry;
    constructor(address: string, type: string, tag: string, name: string, thumbnail?: string, path?: string) {
        this.address = address;
        this.name = name;
        this.tag = tag;
        this.type = type;
        this.thumbnail = thumbnail;
        this.path = path;
    }
}
