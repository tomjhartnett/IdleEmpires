import {Job} from "./job.model";

export class Building {
  name: string;
  image?: string;
  level: number;
  job: Job;
  _upgradeCost: {resource: string, amount: number}[];

  workers: number = 0;
  priority: number;
  workerPriorityType: 'Max' | 'Maintain' | 'Fixed' | 'None' = 'Max';
  autoUpgrade = true;

  get expectedOutput(): {resource: string, amount: number}[] {
    return this.job.outputResources.map(r => ({resource: r.resource, amount: r.amount * this.workers}));
  }

  get upgradeCost(): {resource: string, amount: number}[] {
    return this._upgradeCost.map(r => ({resource: r.resource, amount: r.amount * this.level}));
  }

  get upgradeCostFormatted() {
    return this.upgradeCost.map(r => `${r.resource}: ${r.amount} `);
  }

  get input(): {resource: string, amount: number}[] {
    return this.job.inputResources.map(r => ({resource: r.resource, amount: r.amount * this.workers}));
  }

  get output(): {resource: string, amount: number}[] {
    return this.job.outputResources.map(r => ({resource: r.resource, amount: r.amount * this.workers}));
  }

  get inputFormatted() {
    return this.input.map(r => `${r.resource}: ${r.amount} `);
  }

  get outputFormatted() {
    return this.output.map(r => `${r.resource}: ${r.amount} `);
  }

  get maxWorkers() {
    return this.level;
  }

  get openWorkspaces() {
    return this.maxWorkers - this.workers;
  }

  constructor(priority: number, name: string, level: number, job: Job, upgradeCost: {resource: string, amount: number}[], image?: string) {
    this.priority = priority;
    this.name = name;
    this.level = level;
    this.job = job;
    this.image = image;
    this._upgradeCost = upgradeCost;
  }
}
