import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {CityPanelComponent} from "./components/city-panel/city-panel.component";
import {ResourceBarComponent} from "./components/resource-bar/resource-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainNavbarComponent} from "./components/main-navbar/main-navbar.component";
import {ResearchPanelComponent} from "./components/research-panel/research-panel.component";
import { MapPanelComponent } from './map-panel/map-panel.component';

@NgModule({
    declarations: [
      AppComponent,
      CityPanelComponent,
      ResourceBarComponent,
      MainNavbarComponent,
      ResearchPanelComponent,
      MapPanelComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
