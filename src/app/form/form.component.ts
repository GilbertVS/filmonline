import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Film } from '../interfaces/film';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  film: Film = {
    id : 10000,
    title : '',
    genere : '',
    company : 'please, take a company...',
    price: 0,
    a18 : false,
    descr: ''
  }
  films : Film[] = [];
  selected: boolean[] = [];
  error : boolean = false;
  hidden : boolean = false;
  radio: boolean = true;
  flag: boolean = false;
  row: boolean = false;
  page: number = 0;
  pricemax: number = 10000;
  onlycompany: string = '';
  titlesearch: string = '';
  generesearch: string = '';
  index : number = 0;
  pages : number[] = [];
  constructor(private route: ActivatedRoute, private filmService: FilmService, private location: Location) {}
  ngOnInit(): void {
    this.selectFilm(0);
  }
  operCrud(formulari: NgForm): void {
    if (localStorage.getItem('crud') == 'create') {
      this.films = this.filmService.getLocalStorage();
      this.filmService.addLocalStorage(this.film);
      localStorage.setItem('crud', 'disabled');
      this.location.back();
    }
    else if (localStorage.getItem('crud') == 'update') {
      this.films = this.filmService.getLocalStorage();
      for (let i=0; i<this.films.length; i++) {
        if (this.film.id == this.films[i].id) this.index = i;
      }
      this.filmService.updateLocalStorage(this.film, this.index);
      localStorage.setItem('crud', 'disabled');
      this.location.back();
    }
    else if (localStorage.getItem('crud') == 'drop') {
      this.films = this.filmService.getLocalStorage();
      for (let i=0; i<this.films.length; i++) {
        if (this.film.id == this.films[i].id) this.index = i;
      }
      this.filmService.deleteLocalStorage(this.index);
      localStorage.setItem('crud', 'disabled');
      this.filmService.operFilm(this.film, 3).subscribe(films=> this.film);
      this.location.back();
    }
    else if (localStorage.getItem('crud') == 'list') {
      this.hidden = !this.hidden;
    }
    else  {
      this.location.back();
    }
  }
  selectFilm(idx: number): void {
    this.page = idx * 8;
    this.films = this.filmService.getLocalStorage();
    if (localStorage.getItem('crud') == 'list') this.rangeSearh();
    this.pages.length = parseInt(""+Math.ceil(this.films.length / 8));
    for (let i=0; i < this.pages.length; i++) {
      this.selected[i] = false;
    }
    this.selected[idx] = true;
    let j : number = 0;
    let i: number = idx*8;
    while(j < 8 && i < this.films.length) {
      this.film = {
        id : this.films[i].id,
        title: this.films[i].title,
        genere: this.films[i].genere,
        company : this.films[i].company,
        price : this.films[i].price,
        a18 : this.films[i].a18,
        descr: this.films[i].descr
      }
      this.films.splice(j, 1, this.film);
      j++;
      i++;
    }
    while (this.films.length > j)  {
      this.films.splice(j, 1);
    }
    this.film = {
      id : 10000,
      title: '',
      genere: '',
      company : 'please, take a company...',
      price : 0,
      a18 : false,
      descr: ''
    }
    if (localStorage.getItem('crud') == 'create') {
      let rand: number = this.film.id;
      do {
        this.error = false;
        rand = Math.random() * 100000;
        rand = Math.ceil(rand);
        for (let i=0; i < this.films.length; i++) {
          if (this.films[i].id == rand) this.error = true;
        }
      } while(this.error || rand < 10001 || rand > 99999);
      this.film.id = rand;
    }
    else if (localStorage.getItem('crud') == 'list') {
      this.row = true;
      this.hidden = true;
    }
  }
  enviaFormulary(i: number): void {
    if (localStorage.getItem('crud') == 'list') this.hidden = false;
    if (localStorage.getItem('crud') != 'create') {
      this.index = i;
      this.film = {
        id : this.films[i].id,
        title : this.films[i].title,
        genere : this.films[i].genere,
        company : this.films[i].company,
        price : this.films[i].price,
        a18 : this.films[i].a18,
        descr : this.films[i].descr
      }
    }
    if (localStorage.getItem('crud')== 'list') this.filmService.operFilm(this.film, 0).subscribe(films=> this.film);
  }
  setRadio(): void {
    this.radio = !this.radio;
    this.selectFilm(0);
  }
  setPrice(): void {
    let pri = document.getElementById('priceRange')! as HTMLOptionElement;
    if (pri) this.pricemax = parseInt(pri.value);
    this.selectFilm(0);
  }
  setCompany(): void {
    let com = document.getElementById('companyRange')!as HTMLOptionElement;
    if (com) this.onlycompany = com.value.toString();
    this.selectFilm(0);
  }
  setTitle(): void {
    let tit = document.getElementById('titleSearch')! as HTMLInputElement;
    if (tit) this.titlesearch = tit.value.toString();
    this.selectFilm(0);
  }
  setGenere(): void {
    let gen = document.getElementById('genereSearch')! as HTMLInputElement;
    if (gen) this.generesearch = gen.value.toString();
    this.selectFilm(0);
  }
  rangeSearh() : void {
    if (!this.radio || this.pricemax <= 40 || this.onlycompany != '' || this.generesearch != '' || this.titlesearch != '') {
      for (let i=0; i < this.films.length; i++) {
        this.flag = false;
        if ((this.films[i].a18 && !this.radio) || this.films[i].price > this.pricemax || (this.films[i].company != this.onlycompany && this.onlycompany != ''))  {
          this.films.splice(i, 1);
          i--;
          this.flag = true;
        }
        if (!this.flag && this.films[i].title != this.titlesearch && this.titlesearch != '') {
          for (let j=0; j < this.titlesearch.length; j++) {
            if (this.titlesearch.charAt(j).toUpperCase() != this.films[i].title.charAt(j).toUpperCase()) {
              this.films.splice(i, 1);
              i--;
              this.flag = true;
              break;
            }
          }
        }
        if (!this.flag && this.films[i].genere != this.generesearch && this.generesearch != '') {
          for (let j=0; j < this.generesearch.length; j++) {
            if (this.generesearch.charAt(j).toLowerCase() != this.films[i].genere.charAt(j).toLowerCase()) {
              this.films.splice(i, 1);
              i--;
              break;
            }
          }
        }
      }
    }
  }

}
