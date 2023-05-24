import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imageSubs!: Subscription;
  public from : number = 0;
  public loading: boolean = true;

  constructor(private userService: UserService, private searchesService : SearchesService, private modalImageService: ModalImageService) { }
  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {
  this.uploadUsers();
  this.imageSubs = this.modalImageService.newImage
      .pipe(
        delay(100)
      )
      .subscribe(img => this.uploadUsers());
  }


  uploadUsers(){
    this.loading= true;
    this.userService.uploadUsers(this.from)
    .subscribe({
      next: ({total, users}) => {
        this.totalUsers = total;
        this.users  = users;
        this.usersTemp = users;
        this.loading= false;
      },
      error: (err) => {console.log(err)}
    })
  }

  changePage(value: number){
    this.from += value;
    if(this.from < 0 ){
      this.from =0;
    }else if(this.from > this.totalUsers){
      this.from -= value
    }
    this.uploadUsers();
  }

  
  search(term: string){

    if(term.length === 0 ){
      return this.users = this.usersTemp;
    }

    this.searchesService.search('users', term).subscribe({
      next: (results) => {
        this.users = results
      },error: (err) => {
        console.log(err)
      }
    })
  return true;
  }

  deleteUser(user: User){
    if(user.uid === this.userService.uid){
      return Swal.fire('Error','Do not eliminate yourself', 'error')
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: `delete to ${user.name}`,
      icon: 'question',
      showCancelButton: true,
    
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value){
          this.userService.deleteUser(user)
            .subscribe(resp => {
              Swal.fire('User Deleted!', 'Your file has been deleted.', 'success');
              this.uploadUsers();
            })
        }
      }
    })
    return;
  }

  changeRole(user: User){
    this.userService.saveUser(user).subscribe(
      resp => {
        console.log(resp)
      }
    )

  }

  openModal(user: User){
    this.modalImageService.openModal('users',user.uid!, user.img);
  }
}


