import {Component, OnInit} from '@angular/core';
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
    let change = action == 'increase' ? 1 : -1;
    if (change + building.priority < 1) {
      return;
    }
    let swapIndex = city.buildings.map((b: Building) => b.priority).indexOf(building.priority + change);
    if (swapIndex > -1) {
      city.buildings[swapIndex].priority = building.priority;
    }
    building.priority += change;

    city.buildings = city.buildings.sort((a: Building, b: Building) => a.priority - b.priority);
  }

  upgrade(city: City, building: Building) {
    this.cityManagementService.upgradeBuilding(city, building);
  }

  changeWorkerPriority(city: City, building: Building, type: 'Max' | 'Maintain' | 'Fixed' | 'None') {
    city.changeWorkerPriority(building, type);
  }
}
