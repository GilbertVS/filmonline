import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  title = 'CREATE A FILM';

  ngOnInit(): void {
    this.initNew();
  }
  initNew() : void {
    localStorage.setItem('crud', 'create');
  }
}
