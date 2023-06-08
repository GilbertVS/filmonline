import { Component , OnInit} from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../interfaces/film';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit{
  title = 'FILMS ON-LINE';
  stVis: boolean = false;
  films : Film[] = [];

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.setStVis(false);
    this.films = this.filmService.getLocalStorage();
  }

  setStVis(st: boolean): void {
    this.stVis = st
  }
  getStVis(): boolean {
    return this.stVis
  }

}
