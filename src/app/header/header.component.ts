import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/share/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username:Observable<String>;

  headerForm:FormGroup;

  constructor(private authService: AuthService, private route: Router) {
    //this.isLogged = AuthService.logged;
   }

  ngOnInit(): void {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    
    this.headerForm = new FormGroup({
      selector: new FormControl('Search By',Validators.required),
      search : new FormControl('')
    });
  }
  logout(){
     this.authService.logout();
     console.log("logout");

    }
  onloggin(){
    this.isLoggedIn=true;
  }
}
