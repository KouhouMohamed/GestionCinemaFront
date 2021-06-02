import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../share/auth.service';
import { LoginRequest } from './login.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginRequest: LoginRequest;
  constructor(private authService: AuthService) { 
    this.loginRequest = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }
  login(){
    this.loginRequest.email = this.loginForm.get('email')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequest)
    .subscribe(data => { console.log(data)})
  }
  
}
