import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IdleEmpires';
  component: "Map" | "Buildings" | "Research" = "Buildings";

  selectComponent(component: "Map" | "Buildings" | "Research") {
    this.component = component;
  }
}
