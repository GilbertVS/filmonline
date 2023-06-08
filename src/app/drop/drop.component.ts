import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {

  title = 'DROP A FILMS';

  ngOnInit(): void {
    this.initNew()
  }
  initNew() : void {
    localStorage.setItem('crud', 'drop')
  }
}
