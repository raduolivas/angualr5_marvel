export class Character {
    constructor(
        public id: number,
        public name : string,
        public description : string,
        public thumbnail : Thumbnail,
        public comics: any,
        public series: any,
        public stories: any,
        public events: any,
    ) {}
}

export class Thumbnail {
    constructor(
    public path : string,
    public ext : string
    ){}
}