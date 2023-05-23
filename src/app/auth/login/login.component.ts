import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSummited = false;

  public loginForm : FormGroup= this.fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  })
  constructor(private router: Router, private fb: FormBuilder ){

  }
  login(){
    this.router.navigateByUrl('/');
  }
}
