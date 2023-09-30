import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPanelComponent } from './research-panel.component';

describe('ResearchPanelComponent', () => {
  let component: ResearchPanelComponent;
  let fixture: ComponentFixture<ResearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
