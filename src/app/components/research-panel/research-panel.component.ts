import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../../services/research.service";

@Component({
  selector: 'app-research-panel',
  templateUrl: './research-panel.component.html',
  styleUrls: ['./research-panel.component.css']
})
export class ResearchPanelComponent implements OnInit {

  constructor(
    researchService: ResearchService
  ) { }

  ngOnInit(): void {
  }

}
