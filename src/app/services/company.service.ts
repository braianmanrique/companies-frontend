import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company.mode';
import { RegisterCompany } from '../interfaces/register-company.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

   uploadCompanies( ){
    const url = `${base_url}/companies`;
    
    return this.http.get(url, this.headers)
        .pipe(
          map( (resp:any) => resp.data)
        )
  }

  // createCompany(_id: string , name: string  ){
  //   const url = `${base_url}/companies/${_id}`;
    
  //   return this.http.get(url, this.headers)
  //       .pipe(
  //         map( (resp:any) => resp.data)
  //       )
  // }

 
  createCompany(name:string, nit: string){
    const url = `${base_url}/companies`;
    
    return this.http.post(url, {name, nit} , this.headers)
        .pipe(
          map( (resp:any) => resp)
        )
  }
  updateCompany(id: string, name: string){
    const url = `${base_url}/companies/${id}`;
    
    return this.http.put(url, { name} , this.headers)
        .pipe(
          map( (resp:any) => resp.company)
        )
  }

  deleteCompany(_id: string){
    const url = `${base_url}/companies/${_id}`;
    return this.http.delete(url, this.headers)
  }
}
