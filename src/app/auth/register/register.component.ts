import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    identification: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],

  }, 
   { Validators: this.passwordIguales('password','password2')
  }
  ) ;
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    // create user
    this.userService.createUser(this.registerForm.value).subscribe({
      next: resp => {
        console.log(resp)
        Swal.fire('User added!', 'Exit', 'success');
        this.router.navigateByUrl('/login');

      },
      error : (err) => {
      Swal.fire('Error', err.error.msg, 'error');
     }});
  }


  campoNoValido(campo: string): boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  contrasenasValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value
    if(pass1 === pass2){
      return false;
    }else{
      return true;
    }
  }

  passwordIguales(pass1Name: string, pass2Name: string){
      return (formGroup: FormGroup) => {
        const pass1Control = formGroup.get(pass1Name)
        const pass2Control = formGroup.get(pass2Name)
        if(pass1Control?.value === pass2Control?.value){
          pass2Control?.setErrors(null)
        }else{
          pass2Control?.setErrors({noEsIgual: true})
        }

      }
  }

}
