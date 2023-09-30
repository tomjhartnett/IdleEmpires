export class Technology {
  name: string;
  description: string;
  cost: {resource: string, amount: number}[];
  isCompleted = false;

  get formattedCost(): string {
    let ret = '';
    let first = true;
    this.cost.forEach(r => {
      if(!first) {
        ret += ', ';
      }
      first = false;
      ret += `${r.resource}: ${r.amount}`;
    });
    return ret;
  }

  constructor(name: string, description: string, cost: {resource: string, amount: number}[]) {
    this.name = name;
    this.description = description;
    this.cost = cost;
  }
}
