import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../../services/research.service";
import {Technology} from "../../models/technology.model";

@Component({
  selector: 'app-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.css']
})
export class ResearchPanelComponent implements OnInit {

  technologies: Technology[][];

  constructor(
    private researchService: ResearchService
  ) {
    this.technologies = researchService.getResearchTree();
  }

  ngOnInit(): void {
  }

  researchTech(tech: Technology) {
    this.researchService.research(tech);
  }
}
