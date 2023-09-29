import {Building} from "./building.model";

export class City {
  name: string;
  image?: string;
  buildings: Building[];
  population: number;

  currentFoodFloat = 0;

  get nextPopulationCost() {
    return this._getPopCost(this.population);
  }

  get expectedDailyFoodChange(): number {
    return (this.totalExpectedResources.get("Crops") || 0) - this.population;
  }

  get expectedYearlyPopGrowth(): number {
    let expectedFood = this.expectedDailyFoodChange;
    expectedFood *= 365;
    let count = 0;
    let pop = this.population;
    if (expectedFood > 0) {
      while (expectedFood > this._getPopCost(pop)) {
        expectedFood -= (this._getPopCost(pop++) + pop);
        count++;
      }
    } else {
      if (expectedFood < 0) {
        while(expectedFood < 0) {
          expectedFood += (this._getPopCost(--pop) - pop);
          count--;
          if(this._getPopCost(pop) <= 0)
            break;
        }
      }
    }
    return count;
  }

  get totalExpectedResources(): Map<string, number> {
    let ret = new Map<string, number>();
    this.buildings.forEach(b => {
      b.expectedOutput.forEach(
        r => ret.set(r.resource, ret.has(r.resource) ?
          ret.get(r.resource)! + r.amount :
          r.amount)
      )
    })
    return ret;
  }

  get idlePopulation() {
    return this.population - this.buildings.map(b => b.workers).reduce((sum, a) => sum + a, 0);
  }

  constructor(name: string, buildings: Building[], population: number, image?: string) {
    this.name = name;
    this.buildings = buildings;
    this.population = population;
    this.image = image;
  }

  _getPopCost(currentPop: number): number {
    return currentPop * 2;
  }

  changeWorkforce(building: Building, amount: number) {
    if (this.idlePopulation >= amount) {
      let b = this.buildings.find(b => b === building);
      if (b && b.maxWorkers >= (b.workers + amount)) {
        b.workers += amount;
      }
    }

    return false;
  }
}
