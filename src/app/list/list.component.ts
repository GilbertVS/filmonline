import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title = 'LISTED FILMS'
  ngOnInit(): void {
    this.initNew()
  }
  initNew() : void {
    localStorage.setItem('crud', 'list')
  }
}
