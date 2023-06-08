import { Injectable } from '@angular/core';
import { Film } from '../interfaces/film';
import { PREBS } from '../interfaces/prebs'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  films : Film [] = [];
  constructor(private messageService: MessageService) { }

  operFilm(film :Film, oper :number): Observable<Film[]> {
    const films = of (this.films);
    if (oper == 0) this.messageService.add(': Select film, '+film.title+'. ');
    else if (oper == 3) this.messageService.add(': Delete film, '+film.title+'. ');
    return films;
  }

  getLocalStorage(): Film[] {
    let listStorage = localStorage.getItem("memoryFilm");
    if (!listStorage) localStorage.setItem("memoryFilm", JSON.stringify(PREBS));
    if (listStorage) this.films = JSON.parse(listStorage);
    return this.films;
  }

  addLocalStorage(film: Film): void {
    let pos = this.sortAlfabetic(film);
    this.films.splice(pos, 0, film);
    localStorage.setItem("memoryFilm", JSON.stringify(this.films));
    this.messageService.add(': Create film, '+film.title+'. ');
  }

  updateLocalStorage(film: Film, i: number): void {
    this.films.splice(i, 1);
    let pos = this.sortAlfabetic(film);
    this.films.splice(pos, 0, film);
    localStorage.setItem("memoryFilm", JSON.stringify(this.films));
    this.messageService.add(': Update film, '+film.title+'. ');
  }

  deleteLocalStorage(idx: number): void {
    this.films.splice(idx, 1);
    if (this.films.length < 1) localStorage.removeItem("memoryFilm");
    else localStorage.setItem("memoryFilm", JSON.stringify(this.films));
  }

  sortAlfabetic(film: Film): number {
    let pos : number = this.films.length;
    for (let i=0; i < this.films.length; i++) {
      if (this.films[i].title.charAt(0).toUpperCase() > film.title.charAt(0).toUpperCase() && pos == this.films.length) {
        pos = i;
        break;
      }
      else if (this.films[i].title.charAt(0).toUpperCase() == film.title.charAt(0).toUpperCase() && pos == this.films.length) {
        for(let j=1; j < film.title.length; j++) {
          if (this.films[i].title.charAt(j).toUpperCase() > film.title.charAt(j).toUpperCase()) {
            pos = i;
            break;
          }
          else if (this.films[i].title.charAt(j).toUpperCase() < film.title.charAt(j).toUpperCase()) {
            break;
          }
        }
      }
    }
    return pos;
  }

}

