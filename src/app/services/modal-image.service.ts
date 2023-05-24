import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url =  environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hiddeModal: boolean = true;
  public type!: 'users' | 'articles' | 'companies';
  public id!: string;
  public img!: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  get hiddeModal(){
    return this._hiddeModal
  }
  openModal(type: 'users' | 'companies'| 'articles', id: string, img: string = 'no-image'){
    
    this._hiddeModal = false;
    this.type = type;
    this.id = id;
    // this.img = img!;  
    this.img = `${base_url}/uploads/${type}/${img}`;

  }

  closeModal(){
    this._hiddeModal = true;
  }
}
