import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

   films;

  constructor(private httpClient: HttpClient) { }


  ngOnInit(): void {
  }

onGetFilms(){
  this.httpClient.get("http://localhost:8080/api/film/all")
.subscribe(data =>{
  this.films=data;
},err=>{
this.films = [];
console.log(err);
})
}
}
