import { Routes } from '@angular/router';
import { RainbowChartComponent } from './components/rainbow-chart/rainbow-chart.component';

export const routes: Routes = [
	{ path: 'rainbow-chart', loadComponent: () => RainbowChartComponent },
	{ path: '**', redirectTo: 'rainbow-chart' }
];
