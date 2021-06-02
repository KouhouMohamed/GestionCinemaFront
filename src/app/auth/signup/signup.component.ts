import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../share/auth.service';
import { SignupRequest } from './signup.request';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupResquest : SignupRequest;
  signupForm : FormGroup;
 // private authService: AuthService;
  constructor(private authService: AuthService) {
    this.signupResquest = {
      username:'',
      email:'',
      password:''
    }
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('' ,Validators.required),
      email: new FormControl('' ,[Validators.required, Validators.email]),
      password: new FormControl('' ,Validators.required),
    });
  }
  signup(){
    this.signupResquest.username = this.signupForm.get('username')?.value;
    this.signupResquest.email = this.signupForm.get('email')?.value;
    this.signupResquest.password = this.signupForm.get('password')?.value;
    
    this.authService.signup(this.signupResquest)
    .subscribe(data => { console.log(data)})
  }
}