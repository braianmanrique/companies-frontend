import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { CargarUsuario } from 'app/interfaces/cargar-usuarios.interface';
import { LoginForm } from '../../app/interfaces/login-form.interface';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

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
  validarToken(){

    return this.http.get(`${base_url}/login/renew`, {
      headers : {
        'x-token': this.token
      }
    }).pipe(
      map( (resp:any) => {

        const {email,nombre, identification, role,img = '', uid} = resp.user;
        this.user = new User(
          nombre,email, identification ,'', role, img, uid
        )
        this.user.printUser();
        localStorage.setItem('token', resp.token)
        return true

      }),
      catchError(error => of(false))
    );
  }

  // crearUsuario(formData: RegisterForm){
  //   console.log('creando usuario', base_url);
  //   return this.http.post(`${base_url}/usuarios`, formData)
  //             .pipe(
  //                 tap( (resp:any) => {
  //                 localStorage.setItem('token', resp.token)
  //             })
  //   )
  // }

  updateRole(data: {email: string, nombre: string, role: string}){
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
 
  // cargarUsuarios(desde:number = 0){
  //   const url = `${base_url}/usuarios?desde=${desde}`;

  //   return this.http.get<CargarUsuario>(url, this.headers)
  //         .pipe(
  //           map(resp => {
  //             console.log(resp,'epaa')
  //             const usuarios = resp.usuarios.map(
  //                 user => new Usuario
  //                     (user.nombre, user.email, '', user.role, user.google, user.img, user.uid))
  //             return {
  //               total: resp.total,
  //               usuarios
  //             };
  //           })
  //         )
  
  // }

  deleteUser(user: User){
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User){
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers )
  } 

}
