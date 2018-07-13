import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDataService } from 'src/app/data.service';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestTableComponent } from 'src/app/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import {
    MAT_LABEL_GLOBAL_OPTIONS,
    MatButtonModule,
    MatDialogModule,
    MatIconModule, MatTabsModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestEditComponent } from 'src/app/edit/edit.component';
import { TestChartComponent } from 'src/app/chart/chart.component';

@NgModule({
    declarations: [
        AppComponent,
        TestTableComponent,
        TestEditComponent,
        TestChartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule,
    ],
    providers: [
        TestDataService, {
            provide: MAT_LABEL_GLOBAL_OPTIONS,
            useValue: {float: 'never'},
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [TestEditComponent],
})
export class AppModule {
}
