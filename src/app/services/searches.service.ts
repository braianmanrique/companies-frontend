import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Company } from '../models/company.mode';
import { Article } from '../models/article.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  constructor(private http: HttpClient) { }

  get token(): string{
    return  localStorage.getItem('token') || '';
   }

   get headers(){
    return {
      headers: {  'x-token': this.token }
      }
   }

   private transformUsers(results : any[]):User[]{
    return results.map(
      user => new User (user.name, user.email, user.identification ,'', user.role, user.img, user.uid)
      )
   }

   private transformCompanies(results : any[]):Company[]{
    return results
   }
   private transformArticles(results : any[]):Article[]{
    return results
   }

   globalSearch(term: string){
    const url = `${base_url}/all/${term}`;
    return this.http.get<any[]>(url, this.headers)
   }
   search(
      type: 'users'| 'articles'| 'companies',
      term: string = ''){
        
    const url = `${base_url}/all/collection/${type}/${term}`;
    
    return this.http.get<any[]>(url, this.headers)
        .pipe(
          map( (resp: any)=> {
            console.log(resp)
            switch(type){
              case 'users':
                return this.transformUsers(resp.data)
              case 'companies':
                return this.transformCompanies(resp.data)
              case 'articles':
                return this.transformArticles(resp.data)
              default:
                return [];
            }
          })
        )
   }
}
