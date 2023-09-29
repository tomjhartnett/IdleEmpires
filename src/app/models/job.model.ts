export class Job {
  name: string;
  image?: string;
  inputResources: {resource: string, amount: number}[];
  outputResources: {resource: string, amount: number}[];

  constructor(name: string, inputResources: {resource: string, amount: number}[], outputResources: {resource: string, amount: number}[], image?: string) {
    this.name = name;
    this.inputResources = inputResources;
    this.outputResources = outputResources;
  }
}
