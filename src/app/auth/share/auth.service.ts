import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequest } from '../signup/signup.request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../login/login.request';
import { LoginResponse } from '../login/login.response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, catchError } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

   localhost = "http://127.0.0.1:5000/";
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  imLogged:boolean;
  films;
  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,  ) {
    this.loggedIn.emit(false);
    this.imLogged=false; 

   }
   signup(signupRequest: SignupRequest) : Observable<any>{
     var res= this.httpClient.post(this.localhost+'register',signupRequest,{responseType:'json'});
     console.log('result')
     console.log(res)
   return res;
    }

    logout(){
      
      this.localStorage.store('first_name',"");
      this.localStorage.store('last_name',"");
      this.localStorage.store('email',"");
      this.localStorage.store('profile_image',"");
      this.loggedIn.emit(false);
      this.imLogged=false;
    }

   login(loginRequest:LoginRequest): Observable<boolean>{
     /*
    var res = this.httpClient.get<LoginResponse>('http://127.0.0.1:5000/login/')
    */

    return this.httpClient.post<LoginResponse>(this.localhost+'login/',
       loginRequest).pipe( map(data => {
           if(data.email){
             console.log(data)
             this.localStorage.store('first_name',data.first_name);
              this.localStorage.store('last_name',data.last_name);
              this.localStorage.store('email',data.email);
              this.localStorage.store('profile_image',data.profile_image);
              this.loggedIn.emit(true);
              this.imLogged=true;
              return true;
           }
           else{
             return false;
           }
        }
    ));
     //return logged;
   }

  isLoggedIn(): boolean {
    return this.imLogged;
  }
  getUsers(page){
    return this.httpClient.get(this.localhost+'user?page='+page);
  }
  getUserAddess(userId){
    return this.httpClient.get(this.localhost+'address/user/'+userId);
  }
  userBlock(userId){
   return this.httpClient.put(this.localhost+'user/block'+userId,null); 
  }
}
