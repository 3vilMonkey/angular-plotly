import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowChartComponent } from './rainbow-chart.component';

describe('RainbowChartComponent', () => {
  let component: RainbowChartComponent;
  let fixture: ComponentFixture<RainbowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RainbowChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RainbowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
