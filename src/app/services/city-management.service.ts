import { Injectable } from '@angular/core';
import {City} from "../models/city.model";
import {Building} from "../models/building.model";
import {Job} from "../models/job.model";
import {ResourceManagementService} from "./resource-management.service";

@Injectable({
  providedIn: 'root'
})
export class CityManagementService {
  cities: City[] = [];

  get totalExpectedOutput(): Map<string, number> {
    let ret = new Map<string, number>();
    this.getCities().forEach(city => {
      for(let key of city.totalExpectedResources.keys()) {
        if(ret.has(key)) {
          ret.set(key, ret.get(key)! + city.totalExpectedResources.get(key)!);
        } else {
          ret.set(key, city.totalExpectedResources.get(key)!);
        }
      }
    });
    return ret;
  }

  constructor(
    private resourceManagementService: ResourceManagementService
  ) {
    this.cities.push(
      new City("Madrid",
        [
          new Building(1, "Farm", 4, new Job("Farming", [], [{resource: "Crops", amount: 4}]), [{resource: "Wood", amount: 2}]),
          new Building(0, "Woodcutter", 1, new Job("Woodcutting", [], [{resource: "Wood", amount: 1}]), [{resource: "Wood", amount: 2}]),
          new Building(3, "Tax Collector", 1, new Job("Tax Collecting", [], [{resource: "Gold", amount: 1}]), [{resource: "Wood", amount: 2}]),
          new Building(4, "Research Center", 1, new Job("Researching", [{resource: "Gold", amount: 1}], [{resource: "Research", amount: 1}]), [{resource: "Wood", amount: 2}])
        ],
        4
      )
    );
  }
  tick() {
    this.getCities().forEach(city => {
      let food = city.currentFoodFloat + (city.totalExpectedResources.get("Crops") || 0);
      while (food > city.nextPopulationCost) {
        food -= city.nextPopulationCost;
        city.population++;
      }
      this.resourceManagementService.addResources([{resource: "Crops", amount: food * -1}])
    });

    this.getCities().forEach(city => {
      let resources = [];
      let food = city.currentFoodFloat;
      for(let key of city.totalExpectedResources.keys()) {
        if (key != "Crops") {
          resources.push({resource: key, amount: city.totalExpectedResources.get(key) || 0});
        } else {
          food += (city.totalExpectedResources.get(key) || 0);
        }
      }

      while (food > city.nextPopulationCost) {
        food -= city.nextPopulationCost;
        city.population++;
      }
      city.currentFoodFloat = food;

      this.resourceManagementService._changeResources(resources)
    });


    this.getCities().forEach(city => {
      let upgrades = city.checkAutoUpgrade();
      if (upgrades.length) {
        upgrades.forEach(building => {
          this.upgradeBuilding(city, building);
        })
      }
    });

    this.getCities().forEach(city => city.checkWorkerPriority());
  }

  getCities(): City[] {
    return this.cities;
  }

  upgradeBuilding(city: City, building: Building) {
    let b = city.buildings.find(b => b === building);
    if (b && this.resourceManagementService.hasResources(b.upgradeCost)) {
      building.level++;
      this.getCities().forEach(city => city.checkWorkerPriority());
      this.resourceManagementService.removeResources(b.upgradeCost);
    }
  }
}
