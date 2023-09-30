import { Injectable } from '@angular/core';
import {Technology} from "../models/technology.model";
import {ResourceManagementService} from "./resource-management.service";

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(
    private resourceManagementService: ResourceManagementService
  ) { }

  research(technology: Technology): boolean {
    let completed = false;
    if(this.resourceManagementService.hasResources(technology.cost)) {
      this.resourceManagementService.removeResources(technology.cost);
      technology.isCompleted = true;
    }
    return completed;
  }

  getResearchTree(): Technology[][] {
    return this.techTree;
  }

  isResearched(techName: string): boolean {
    let isCompleted = false;
    this.techTree.forEach(column => {
      column.forEach(t => {
        if(t.name === techName)
          isCompleted = t.isCompleted;
      })
    })
    return isCompleted;
  }


  techTree = [
    [
      new Technology('Ranches','Adds meat as an additional food source', [{resource: "Research", amount: 200}, {resource: "Gold", amount: 200}]),
      new Technology('Kitchens','Uses simple foods to make more efficient meals', [{resource: "Research", amount: 400}, {resource: "Gold", amount: 400}]),
    ],
    [
      new Technology('Iron Mines','Allows the mining of iron', [{resource: "Research", amount: 100}, {resource: "Gold", amount: 100}]),
      new Technology('Tool Workshops','Allows the production of tools', [{resource: "Research", amount: 200}, {resource: "Gold", amount: 200}]),
      new Technology('Horse Farms','Generates horses', [{resource: "Research", amount: 400}, {resource: "Gold", amount: 400}]),
      new Technology('Weapon Production','Allows the production of weapons', [{resource: "Research", amount: 800}, {resource: "Gold", amount: 800}]),
      new Technology('Armor Production','Allows the production of armor', [{resource: "Research", amount: 1600}, {resource: "Gold", amount: 1600}]),
    ],
    [
      new Technology('Militia Training','Allows production of militia', [{resource: "Research", amount: 100}, {resource: "Gold", amount: 100}]),
      new Technology('Archery Range','Allows production of ranged units', [{resource: "Research", amount: 200}, {resource: "Gold", amount: 200}]),
      new Technology('Barracks','Allows production of melee units', [{resource: "Research", amount: 400}, {resource: "Gold", amount: 400}]),
      new Technology('Stables','Allows production of mounted units', [{resource: "Research", amount: 800}, {resource: "Gold", amount: 800}]),
    ],
    [
      new Technology('Temples','Unlocks religion and faith generation', [{resource: "Research", amount: 400}, {resource: "Gold", amount: 400}]),
    ],
    [
      new Technology('Natural Growth','Allows the founding of a 2nd city', [{resource: "Research", amount: 100}, {resource: "Gold", amount: 100}]),
      new Technology('Expansive Empire','Allows the founding of a 3nd city', [{resource: "Research", amount: 800}, {resource: "Gold", amount: 800}]),
    ]
  ];
}
