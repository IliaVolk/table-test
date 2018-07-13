import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestTableComponent } from 'src/app/table/table.component';
import { TestChartComponent } from 'src/app/chart/chart.component';

const routes: Routes = [{
    path: '', redirectTo: 'table', pathMatch: 'full',
}, {
    path: 'table', component: TestTableComponent,
}, {
    path: 'chart', component: TestChartComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
