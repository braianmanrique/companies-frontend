
interface _CompanyUser {
    name: string,
    _id: string,
    img: string,
}

export class Company{
    constructor(
        public name: string,
        public nit: string,
        public _id?: string,
        public user?: _CompanyUser,
        public img?: string,
    ){}
}
