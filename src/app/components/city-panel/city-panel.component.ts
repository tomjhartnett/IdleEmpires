import { Component, OnInit } from '@angular/core';
import {CityManagementService} from "../../services/city-management.service";
import {City} from "../../models/city.model";
import {ResourceManagementService} from "../../services/resource-management.service";

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
  }

  upgrade(city: any, building: any) {
    this.cityManagementService.upgradeBuilding(city, building);
  }
}
