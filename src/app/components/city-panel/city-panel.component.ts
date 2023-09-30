import {Component, Input, OnInit} from '@angular/core';
import {CityManagementService} from "../../services/city-management.service";
import {City} from "../../models/city.model";
import {Building} from "../../models/building.model";

@Component({
  selector: 'app-city-panel',
  templateUrl: './city-panel.component.html',
  styleUrls: ['./city-panel.component.css']
})
export class CityPanelComponent implements OnInit {
  cities: City[];

  constructor(
    private cityManagementService: CityManagementService
  ) {
    this.cities = cityManagementService.getCities();
  }

  ngOnInit(): void {
  }

  adjustWorkers(city: any, building: any, action: string) {
    if (action === 'increase') {
      city.changeWorkforce(building, 1);
    } else if (action === 'decrease' && building.workers > 0) {
      city.changeWorkforce(building, -1);
    }
  }

  adjustPriority(city: any, building: any, action: string) {
    if (action === 'increase') {
      building.priority++;
    } else if (action === 'decrease' && building.priority > 0) {
      building.priority--;
    }
    city.buildings = city.buildings.sort((a: Building, b: Building) => a.priority - b.priority);
  }

  upgrade(city: City, building: Building) {
    this.cityManagementService.upgradeBuilding(city, building);
  }

  changeWorkerPriority(city: City, building: Building, type: 'Max' | 'Maintain' | 'Fixed' | 'None') {
    city.changeWorkerPriority(building, type);
  }
}
