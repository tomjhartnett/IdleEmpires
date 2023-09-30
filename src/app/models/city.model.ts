import {Building} from "./building.model";

export class City {
  name: string;
  image?: string;
  buildings: Building[];
  population: number;

  currentFoodFloat = 0;

  get availableWorkers(): number {
    return this.population - this.buildings.map(b => b.workers).reduce((s, a) => s + a, 0);
  }

  get nextPopulationCost() {
    return this._getPopCost(this.population);
  }

  get expectedDailyFoodOutput(): number {
    return (this.totalExpectedResources.get("Crops") || 0);
  }

  get expectedDailyFoodChange(): number {
    return this.expectedDailyFoodOutput - this.population;
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
    this.buildings = buildings.sort((a, b) => a.priority - b.priority);
    this.population = population;
    this.image = image;

    this.checkWorkerPriority();
  }

  _getPopCost(currentPop: number): number {
    return currentPop * 2;
  }

  changeWorkforce(building: Building, amount: number) {
    let b = this.buildings.find(b => b === building);
    if (amount > 0 && this.idlePopulation >= amount) {
      if (b && b.maxWorkers >= (b.workers + amount)) {
        b.workers += amount;
      }
    } else if (amount < 0) {
      if (b && b.workers > amount) {
        b.workers += amount;
      }
    }
  }

  changeWorkerPriority(building: Building, type: 'Max' | 'Maintain' | 'Fixed' | 'None') {
      building.workerPriorityType = type;
      this.checkWorkerPriority();
  }

  checkWorkerPriority() {
    let totalPop = this.population;
    let sortedBuildings = this.buildings.sort((a, b) => a.priority - b.priority);
    sortedBuildings.forEach(building => {
      switch (building.workerPriorityType) {
        case "Fixed": break;
        case "Max": this.availableWorkers >= building.openWorkspaces ?
          building.workers += building.openWorkspaces :
          building.workers += this.availableWorkers;
          break;
        // case "Maintain":
        //   let resourceDeficit = building.output.map(r => r.resource);
        //
        //   break;
        case "None": building.workers = 0; break;
        default: console.log(building.workers, this.availableWorkers);
      }
    });
  }

  checkAutoUpgrade(): Building[] {
    let upgrades: Building[] = [];
    this.buildings.forEach(building => {
      if (building.autoUpgrade && building.workers === building.maxWorkers)
        upgrades.push(building);
    });
    return upgrades;
  }
}
