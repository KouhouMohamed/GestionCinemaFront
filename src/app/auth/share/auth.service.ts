import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequest } from '../signup/signup.request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../login/login.request';
import { LoginResponse } from '../login/login.response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged:boolean;
  films;
  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,  ) {
        this.logged=false;
        this.films = 
          [
            {
                 "id":1,
                 "titre":"Ajafrar",
                 "duree":1.5,
                 "categorie":"comidy",
                 "realisateur":"Ahmed Ntama",
                 "dateSortie":"12/02/2021",
                 "description":"This is an amazigh film" 
            }
          ]
        
   }
   signup(signupRequest: SignupRequest) : Observable<any>{
     return this.httpClient.post('http://localhost:8080/api/auth/signup',signupRequest,{responseType:'text'});
   }
   login(loginRequest:LoginRequest): Observable<boolean>{
     return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
     loginRequest).pipe( map(data => {
      this.localStorage.store('username',data.username);
      this.localStorage.store('enable',data.enable);
      this.localStorage.store('correct',data.correct);

      return true;
    }));
     //return logged;
   }
   getFilms(mypage, mylimit){
    this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit).subscribe(data =>{
      this.films=data;
    });
    return this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit)
  }

   getFilmsByTitle(title,mypage, mylimit){
    this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit).subscribe(data =>{
      this.films=data;
    });
      return this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit)
    }
    getFilmsByCategory(category,mypage, mylimit){
      this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit).subscribe(data =>{
      this.films=data;
    });
      return this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit)
    }
    getFilmsByAuthor(author,mypage, mylimit){
      this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit).subscribe(data =>{
      this.films=data;
    });
      return this.httpClient.get("http://localhost:8080/api/film/all?page="+mypage+"&limit="+mylimit)
    }
}
