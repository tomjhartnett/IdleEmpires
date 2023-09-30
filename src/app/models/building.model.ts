import {Job} from "./job.model";

export class Building {
  name: string;
  image?: string;
  level: number;
  job: Job;
  _upgradeCost: {resource: string, amount: number}[];

  workers: number = 0;
  priority: number;
  workerPriorityType: 'Max' | 'Maintain' | 'Fixed' | 'None' = 'Fixed';
  autoUpgrade = false;

  get expectedOutput(): {resource: string, amount: number}[] {
    return this.job.outputResources.map(r => ({resource: r.resource, amount: r.amount * this.workers}));
  }

  get upgradeCost(): {resource: string, amount: number}[] {
    return this._upgradeCost.map(r => ({resource: r.resource, amount: r.amount * this.level}));
  }

  get upgradeCostFormatted() {
    return this.upgradeCost.map(r => `${r.resource}: ${r.amount} `);
  }

  get output(): {resource: string, amount: number}[] {
    return this.job.outputResources.map(r => ({resource: r.resource, amount: r.amount * this.workers}));
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
