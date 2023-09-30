import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {
  @Output() componentSelector: EventEmitter<any> = new EventEmitter();
  selected: "Map" | "Buildings" | "Research" = "Buildings";

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(tab: "Map" | "Buildings" | "Research") {
    this.componentSelector.emit(tab);
    this.selected = tab;
  }
}
