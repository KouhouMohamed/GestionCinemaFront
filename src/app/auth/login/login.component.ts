import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  isError: boolean;
  registerSuccessMessage: string;
  constructor(private authService: AuthService,
    private activatedRouter: ActivatedRoute, private route: Router,private toastr: ToastrService) { 
    this.loginRequest = {
      email: '',
      password: ''
    };
    this.isError = false; 
  }                                                                                                                                                     

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });

    this.activatedRouter.queryParams
    .subscribe(params => {
      this.toastr.success('Signup Successfil');
      this.registerSuccessMessage = 'Please activate your account before you Login !';
    });
  }
  login(){
    this.loginRequest.email = this.loginForm.get('email')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequest)
    .subscribe(data => { 
      if(data){
        this.isError = false;
        this.route.navigateByUrl('/');
        this.toastr.success('Login Successful')
      }else {
        this.isError = true;
      }
    })
  }
  
}
