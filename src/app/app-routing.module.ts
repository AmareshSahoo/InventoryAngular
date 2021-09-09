import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftsComponent } from './pages/aircrafts/aircrafts.component';
import { AirportsComponent } from './pages/airports/airports.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
 { path: '',   redirectTo: '/airport', pathMatch: 'full' },
  { path: 'airport', component: AirportsComponent },
  { path: 'aircrafts', component: AircraftsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', component: AirportsComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
