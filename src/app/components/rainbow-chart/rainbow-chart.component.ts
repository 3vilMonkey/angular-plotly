import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-rainbow-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rainbow-chart.component.html',
  styleUrl: './rainbow-chart.component.scss'
})
export class RainbowChartComponent implements OnInit, AfterContentInit {
  tooltipContent: { loadfactor: number; readingDay: number } | null = null;
  tooltipStyle: any | null = null;
  @ViewChild('plotlyContainer', { static: true }) plotlyContainer!: ElementRef<HTMLElement>;
  @ViewChild('tooltipContainer', { static: false }) tooltipContainer!: ElementRef<HTMLElement>;
  // 21-11, 10-9, 8-7, 6, 5-4, 3, 2, 1
  barChart: Plotly.ScatterData = {
    x: [5.5, 12, 14, 15.5, 17, 18.5, 19.5, 20.5],
    y: [35, 55, 75, 45, 35, 20, 60, 70],
    width: [11, 2, 2, 1, 2, 1, 1, 1],
    type: 'bar',
    orientation: 'v',
    // hovertemplate: `<span>Reading Day</span><br><span>%{x}</span><br><span>Expected Loadfactor</span><br><span>%{y}</span><extra></extra>`,
    hovertemplate: ``,
    hoverinfo: 'none',
    showlegend: false,
  } as Plotly.ScatterData;;

  lineChart: Plotly.ScatterData = {
    x: [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    y: [0, 1, 1, 2, 2, 2, 5, 5, 5, 10, 13, 15, 17, 19, 21, 24, 49, 68, 79, 89, 95],
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      shape: 'spline',
      color: '#05164d',
      width: 4,
    },
    hoverinfo: 'none',
    marker: {
      size: 12,
      color: ['#05164d', '#05164d', '#05164d', '#05164d', '#05164d', '#FFF'],
      line: {
        color: '#05164d',
        width: 2,
      }
    }
  } as Plotly.ScatterData;

  layout: Partial<Plotly.Layout> = {
    barmode: 'stack',
    bargap: 0,
    xaxis: {
      showgrid: false,
      gridwidth: 0,
      autorange: 'reversed',
      ticklen: 15,
      dividercolor: 'grey',
      dividerwidth: 12,
      range: [0, 21],
      tickvals: Array.from({ length: 21 }, (_, index) => index + 1),
      showdividers: true,
    },
    yaxis: {
      range: [0, 100]
    },
    showlegend: false,
    clickmode: 'event',
    dragmode: false,
  };

  options: Partial<Plotly.Config> = {
    displayModeBar: false,
    scrollZoom: false,
    autosizable: false,
    editable: false,
    showAxisDragHandles: false,
    showEditInChartStudio: false,
    showTips: false,
    showLink: false,
    doubleClick: false,
  }

  ngOnInit(): void {
    this.createRainbowChart();
  }

  ngAfterContentInit(): void {
    (this.plotlyContainer.nativeElement as any).on('plotly_hover', (data: any) => {
      this.tooltipContent = {
        loadfactor: data.points[0].y,
        readingDay: data.points[0].x
      };
      this.tooltipStyle = `position: absolute; top: ${data.event.pageY}px; left: ${data.event.pageX}px`
    }).on('plotly_unhover', () => {
      this.tooltipContent = null;
      this.tooltipStyle = null;
    });
  }

  createRainbowChart(): void {
    const barChart: Plotly.PlotData = {
      x: [5.5, 12, 14, 15.5, 17, 18.5, 19.5, 20.5],
      y: [55, 65, 85, 65, 45, 50, 80, 90],
      width: [11, 2, 2, 1, 2, 1, 1, 1],
      type: 'bar',
      orientation: 'v',
      hovertemplate: ``,
      hoverinfo: 'none',
      showlegend: false,
    } as Plotly.PlotData;
    Plotly.newPlot('plotly-container', [this.barChart, barChart, this.lineChart], this.layout, this.options);
  }
}
