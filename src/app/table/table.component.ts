import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TestData, TestDataService } from 'src/app/data.service';
import {
    MatColumnDef,
    MatDialog,
    MatPaginator,
    MatSort,
    MatTableDataSource
} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { TestEditComponent } from 'src/app/edit/edit.component';

@Component({
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TestTableComponent implements OnInit {
    types = [];
    locations = [];
    owners = [];
    maxDate: Date;
    minDate: Date;
    dataSource = new MatTableDataSource<TestData>(this.dataService.data);
    displayedColumns = [];
    @ViewChildren(MatColumnDef) set columns(columns: QueryList<MatColumnDef>) {
        Promise.resolve().then(() => {
            this.displayedColumns = columns.map(column => column.name);
        });
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filterForm = this.formBuilder.group({
        type: this.formBuilder.control(null),
        location: this.formBuilder.control(null),
        owner: this.formBuilder.control(null),
        date: this.formBuilder.control(null),
    });
    constructor(public dataService: TestDataService,
                private dialog: MatDialog,
                private formBuilder: FormBuilder) {}
    
    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.configureFilters();
        this.dataSource.filterPredicate = (data, filter: any) => {
            if ((!filter.type || data.type === filter.type) &&
                (!filter.location || data.location === filter.location) &&
                (!filter.owner || data.owner === filter.owner) &&
                (!filter.date || data.date > filter.date.begin && data.date < filter.date.end)
            ) {
                return true;
            }
            return false;
        };
        this.filterForm.valueChanges.subscribe(filter => {
            this.dataSource.filter = filter;
            this.dataSource.paginator.firstPage();
        });
    }
    configureFilters() {
        const data = this.dataService.data;
        this.types = [...new Set(data.map(data => data.type))];
        this.locations = [...new Set(data.map(data => data.location))];
        this.owners = [...new Set(data.map(data => data.owner))];
        this.minDate = data.reduce((min, next) => {
            return min.getTime() < next.date.getTime() ? min : next.date;
        }, data[0].date);
        this.maxDate = data.reduce((max, next) => {
            return max.getTime() > next.date.getTime() ? max : next.date;
        }, data[0].date);
    }
    edit(data: TestData) {
        this.dialog.open(TestEditComponent, {
            panelClass: 'test-edit',
            data,
        }).afterClosed().subscribe(newItem => {
            Object.assign(data, newItem);
        });
    }
}
