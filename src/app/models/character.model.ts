export class Character {
    constructor(
        public id: number,
        public name : string,
        public description : string,
        public thumbnail : Thumbnail
    ) {}
}

export class Thumbnail {
    constructor(
    public path : string,
    public ext : string
    ){}
}