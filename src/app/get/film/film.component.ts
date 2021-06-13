import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

   films;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
  }

onGetFilms(){
  this.authService.getFilms(0,2)
.subscribe(data =>{
  this.films=data;
},err=>{
this.films = [];
console.log(err);
})
}
}
