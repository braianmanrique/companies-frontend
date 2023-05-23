import { environment } from "../../environments/environment"

const base_url = environment.base_url;

export class User{
    constructor(
        public name: string,
        public email: string,
        public identification: number,
        public password?: string,
        public role?: string,
        public img?: string,
        public uid?: string
    ){}

    printUser(){
        console.log('user',this.name)
    }

    get imageUrl(){
        if(!this.img){
            return `${base_url}/uploads/users/no-image`;
        } else if (this.img){
            return `${base_url}/uploads/users/${this.img}`
            
        }else{
             return `${base_url}/uploads/usuarios/no-image`;
        }
        
    }
}