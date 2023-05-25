import { Company } from "./company.mode";

interface _ArticleUser {
    name: string,
    _id: string,
    img: string,
}



export class Article{
    constructor(
        public name: string,
        public _id?: string,
        public user?: _ArticleUser,
        public img?: string,
        public company?: Company
    ){}
}
