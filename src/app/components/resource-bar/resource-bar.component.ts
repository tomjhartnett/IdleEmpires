import { Component, OnInit } from '@angular/core';
import {ResourceManagementService} from "../../services/resource-management.service";
import {CityManagementService} from "../../services/city-management.service";
import {GameEngineService} from "../../services/game-engine.service";

@Component({
  selector: 'app-resource-bar',
  templateUrl: './resource-bar.component.html',
  styleUrls: ['./resource-bar.component.css']
})
export class ResourceBarComponent implements OnInit {
  isSelected: boolean = false;

  get formattedResourceBar() {
    return this.resourceManagementService.formattedResourceBar;
  }

  get totalExpectedOutput() {
    return this.cityManagementService.totalExpectedOutput;
  }

  constructor(
    private resourceManagementService: ResourceManagementService,
    private cityManagementService: CityManagementService,
    private gameEngineService: GameEngineService
  ) { }

  ngOnInit(): void {
  }

  toggleButton(): void {
    this.isSelected = !this.isSelected;
    if(this.isSelected) {
      this.gameEngineService.unpause();
    } else {
      this.gameEngineService.pause();
    }
  }
}
