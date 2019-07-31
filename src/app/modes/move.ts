export class Move {

    public address: string;
    public type: string;
    public tag: string;
    public name: string;
    
    constructor(address: string, type: string, tag: string, name: string) {
        this.address = address;
        this.name = name;
        this.tag = tag;
        this.type = type;
    }
}
