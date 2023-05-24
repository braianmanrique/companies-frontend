import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public profileForm!: FormGroup ;
  public user !: User;
  public imageUpload!: File; 
  public imgTemp!: string | ArrayBuffer ;

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
   }

   ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required],
      email: [this.user.email, [Validators.required , Validators.email]]
      })
    }

   updateProfile(){
    this.userService.updateProfile(this.profileForm.value).subscribe( {
      next: () => {
        const {name, email} = this.profileForm.value; 
        this.user.name = name;
        this.user.email = email;
  
        Swal.fire('Saved', 'Changes were saved', 'success')
      }, error: (err) => {
        Swal.fire('error', err.error.msg, 'error')
      }

    })
  }

   changeImage(file:File){

    this.imageUpload = file;
    
    if(!file) {return this.imgTemp = null!;}
       
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result!;
    }
    return true;
  }

   uploadImage(){
    this.fileUploadService.updatePhoto(this.imageUpload, 'users', this.user.uid!)
      .then(img => {
        this.user.img = img;
        Swal.fire('Saved', 'Changes were saved', 'success')
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }
}
