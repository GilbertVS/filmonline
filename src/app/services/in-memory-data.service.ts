import { Injectable } from '@angular/core';
//import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService /*implements InMemoryDbService*/ {

  createDb() {
    const films = [
      {id: 10001, title: 'X Men La decisión final', genere: 'Ciencia ficción', company: 'MARVEL', price: 31.5, a18: false, descr: 'Ellos son los elegidos para conseguir salvar la tierra, ¿lo conseguirán?'},
  {id: 10002, title: 'Eclipse La saga del crepúsculo', genere: 'romántica', company: 'MARVEL', price: 25.5, a18: true, descr: 'Romance y pasión él hará lo que sea por ella.'},
  {id: 10003, title: 'Mercenary, un hombre una guerra', genere: 'acción y violencia', company: 'FILMAX', price: 37.5, a18: true, descr: 'Soldado contratado para pelear y derrocar gobiernos alrederor de todo el mundo.'},
  {id: 10004, title: 'Underworld, una lucha inmortal por la supremacia', genere: 'ciencia ficción', company: 'FILMAX', price: 35.5, a18: true, descr: 'La lucha entre dos razas superiores a los humanos ha luchado entre si durante siglos, es tiempo de restablecer el orden.'},
  {id: 10005, title: 'Gladiador, el luchador', genere: 'acción', company: 'UNIVERSAL', price: 25.5, a18: false, descr: 'El general que se convirtió en esclavo, el esclavo que se convirtió en gladiador, el gradiador que desafió a un imperio.'}
    ];
    return {films};
  }


  genId(films: Film[]): number {
    return films.length > 0 ? Math.max(...films.map(film => film.id)) + 1 : 11;
  }
}
