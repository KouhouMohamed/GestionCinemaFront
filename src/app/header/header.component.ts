import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/share/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged;
  headerForm:FormGroup;
  films;
  constructor(private authService: AuthService, private route: Router) {
    this.isLogged = true;
   }

  ngOnInit(): void {
    this.headerForm = new FormGroup({
      selector: new FormControl('Search By',Validators.required),
      search : new FormControl('')
    });
  }valida
getFilms(){
console.log(this.headerForm.get('selector')?.value);
console.log(this.headerForm.get('search')?.value);
switch (this.headerForm.get('selector')?.value) {
  case '1':
    this.authService.getFilmsByTitle(this.headerForm.get('search')?.value,0,2).subscribe(data =>{
      this.films=data;
    });
    break;
  
  case '2':
    this.authService.getFilmsByCategory(this.headerForm.get('search')?.value,0,2).subscribe(data =>{
      this.films=data;
    });
    break;
  case '3':
    this.authService.getFilmsByAuthor(this.headerForm.get('search')?.value,0,2).subscribe(data =>{
      this.films=data;
    });
    break;

  default:
    break;
}
//this.route.
}
}