import { Component, } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent {
  public user !: User;
  public imageUpload!: File; 
  public imgTemp!: string | ArrayBuffer ;

  constructor(public modalImageService: ModalImageService,  public fileUploadService: FileUploadService){
  }
  closeModal(){
    this.modalImageService.closeModal()
    this.imgTemp = null!;
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
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePhoto(this.imageUpload, type  , id)
      .then(img => {
        Swal.fire('Saved', 'Changes were saved', 'success')
        this.modalImageService.newImage.emit(img);
        
        this.closeModal()
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }
}
