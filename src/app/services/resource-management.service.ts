import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceManagementService {

  resources: Map<string, number> = new Map<string, number>();

  get formattedResourceBar(): {resource: string, amount: number}[] {
    let ret = [];
    for(let key of this.resources.keys()) {
      ret.push({resource: key, amount: this.resources.get(key) || 0});
    }
    return ret;
  }

  constructor() {
    this.resources.set("Wood", 100);
  }

  hasResources(resources: {resource: string, amount: number}[]) {
    let hasAll = true;
    resources.forEach((needed) => {
      if(!this.resources.has(needed.resource) || this.resources.get(needed.resource)! < needed.amount)
        hasAll = false;
    })
    return hasAll;
  }

  _changeResources(resources: {resource: string, amount: number}[]) {
    resources.forEach(resource => {
      if (this.resources.has(resource.resource)) {
        this.resources.set(resource.resource, this.resources.get(resource.resource)! + resource.amount)
      }
    });
  }

  removeResources(resources: {resource: string, amount: number}[]) {
    this._changeResources(resources.map(r => ({resource: r.resource, amount: r.amount * -1})));
  }

  addResources(resources: {resource: string, amount: number}[]) {
    this._changeResources(resources);
  }
}
