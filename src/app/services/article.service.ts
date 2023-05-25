import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  get token(): string{
    return  localStorage.getItem('token') || '';
   }

   get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
   }

   sharedArticles( ){
    const url = `${base_url}/articles`;
    
    return this.http.get(url, this.headers)
        .pipe(
          map( (resp:any) => resp.articles)
        )
  }

  getArticleById(id:string){
    const url = `${base_url}/articles/${id}`;
    
    return this.http.get(url, this.headers)
        .pipe(
          map( (resp:any) => resp.article)
        )
  }

  createArticle(article: {name: string, company: string}){

    const url = `${base_url}/articles`;
    
    return this.http.post(url, article , this.headers)
  
  }
  updateArticle(article : Article){
   
    const url = `${base_url}/articles/${article._id}`;
    
    return this.http.put(url, article , this.headers)
  }

  deleteArticle(_id: string){
    const url = `${base_url}/articles/${_id}`;
    return this.http.delete(url, this.headers)
  }

  sendEmail(pdf: any){
    const url = `${base_url}/articles/email`;

    return this.http.post(url, pdf , this.headers)
  }
}
