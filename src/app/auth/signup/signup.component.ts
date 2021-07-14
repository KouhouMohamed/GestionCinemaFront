import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
  constructor(private authService: AuthService,private router: Router ,private toastr: ToastrService) {
    this.signupResquest = {
    first_name: '',
    last_name: '',
    email: '',
    password:'',
    profile_image: '',
    }
   }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl('' ,Validators.required),
      last_name: new FormControl('' ,Validators.required),
      email: new FormControl('' ,[Validators.required, Validators.email]),
      password: new FormControl('' ,Validators.required),
      profile_image: new FormControl('' ,Validators.required),
    });
  }
  signup(){
    this.signupResquest.first_name = this.signupForm.get('first_name')?.value;
    this.signupResquest.last_name = this.signupForm.get('last_name')?.value;
    this.signupResquest.email = this.signupForm.get('email')?.value;
    this.signupResquest.password = this.signupForm.get('password')?.value;
    this.signupResquest.profile_image = this.signupForm.get('profile_image')?.value;
    
    this.authService.signup(this.signupResquest)
    .subscribe(() => {
      this.toastr.success('Signup Successfil');
      this.router.navigate(['/login'],
      { queryParams: { registered: 'true'}});
    },
      () => {
        this.toastr.error('registration error please try again');
      }
      );
  }
}