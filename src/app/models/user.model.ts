import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class User{
    length: any;
    constructor(
        public name: string,
        public email: string,
        public identification: number,
        public password?: string,
        public role?: string,
        public img?: string,
        public uid?: string
    ){}

    get imageUrl(){
        if(!this.img){
            return `${base_url}/uploads/users/no-image`;
        } else{
            return `${base_url}/uploads/users/${this.img}`
        }
        
    }
}