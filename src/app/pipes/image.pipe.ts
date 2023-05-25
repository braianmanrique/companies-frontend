import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users' | 'articles' | 'companies'): string {
  
      if(!img){
          return `${base_url}/uploads/users/no-image`;
      } else{
          return `${base_url}/uploads/${type}/${img}`
      }
    
  }

}
