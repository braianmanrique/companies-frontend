import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { CargarUsuario } from 'app/interfaces/cargar-usuarios.interface';
import { LoginForm } from '../../app/interfaces/login-form.interface';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { UploadUsers } from '../interfaces/upload-users.interface';

declare const google: any;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth2: any;
  public user!: User ;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { 
  }

   get token(): string{
    return  localStorage.getItem('token') || '';
   }

   get uid(): string{
    return this.user?.uid || '';
   }
   get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
   }
  validateToken(){

    return this.http.get(`${base_url}/login/renew`, this.headers ).pipe(
      map( (resp:any) => {

        const {email,name, identification, role, img = '', uid} = resp.user;
        this.user = new User( name,email, identification ,'', role, img, uid);
        localStorage.setItem('token', resp.token)
        return true
      }),
      catchError(error => of(false))
    );
  }

  updateRole(data: {email: string, name: string, role: string}){
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers )
   
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
          .pipe(
            tap( (resp:any) => {
              localStorage.setItem('token', resp.token)
            })
          )
  }
  
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  deleteUser(user: User){
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User){
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers )
  } 

  updateProfile(data: {email: string, name: string, role: string}){
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers )
   
  }

  uploadUsers(from:number = 0){
    const url = `${base_url}/users?from=${from}`;

    return this.http.get<UploadUsers>(url, this.headers)
          .pipe(
            map(resp => {
              const users = resp.users.map(user => new User(user.name, user.email, user.identification , '', user.role, user.img, user.uid))
              return {
                total: resp.total,
                users
              };
            })
          )
  }



}
