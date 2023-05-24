import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSummited = false;

  public loginForm : FormGroup= this.fb.group({
    email: [localStorage.getItem('email') || '',  [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })
  constructor(private router: Router, private fb: FormBuilder, private userService : UserService ){}
 
  login(){
    if(this.loginForm.invalid){
      return;
    }

    const dataForm = this.loginForm.value;

    this.userService.login(dataForm).subscribe({
      next: resp => {
        console.log(resp)

        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        }else{
          localStorage.removeItem('email')
        }
        this.router.navigateByUrl('/');
      },
      error: (err) =>{
        Swal.fire('Error', err.error.msg, 'error')
    }
    })
    
  }
}
