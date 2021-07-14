import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/share/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;
  demandedUser;
  inDemande:boolean;
  userBlock;
  hasUsers:boolean;
  userAddress;
  constructor(private authService:AuthService) {
  this.inDemande = false
   }

  ngOnInit(): void {
    this.onGetUser()
  }

  onGetUser(){
    this.authService.getUsers(1).subscribe(
      data =>{
        this.users= data['data'];
        this.hasUsers = (this.users.lenght != 0);
      }
      );
  }
  showUserInfo(user){
    this.demandedUser = user;
    this.get_user_address(user.id);
    this.inDemande=true;
    this.userBlock=user.isblock;
  }
  closeUserInfo(){
   this.inDemande=false; 
  }
  get_user_address(user_id){
      this.authService.getUserAddess(user_id).subscribe(
          data =>{
            this.userAddress=data;
          }
        )
  }
  blockUser(user_id){
    console.log("blockUser")
    this.authService.userBlock(user_id);
    this.onGetUser();
  }

}
