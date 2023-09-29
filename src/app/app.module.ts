import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./components/app.component";
import {CityPanelComponent} from "./components/city-panel/city-panel.component";
import {ResourceBarComponent} from "./components/resource-bar/resource-bar.component";

@NgModule({
    declarations: [
        AppComponent,
        CityPanelComponent,
        ResourceBarComponent
    ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
