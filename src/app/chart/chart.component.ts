import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TestDataService } from 'src/app/data.service';
import { Chart } from 'chart.js';

@Component({
    template: `<canvas #container></canvas>`,
    styles: [`
        :host {
            width: 100%;
            min-height: 500px;
            display: block;
        }
    `]
})
export class TestChartComponent implements AfterViewInit {
    @ViewChild('container') element: ElementRef;
    constructor(private dataService: TestDataService) {}
    ngAfterViewInit() {
        const ctx = this.element.nativeElement.getContext('2d');
        const data = this.dataService.data.reduce((res, curr) => {
            res[curr.error] += 1;
            return res;
        }, {
            1: 0, 2: 0, 3: 0, 4: 0,
        });
        const labels = Object.keys(data);
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    backgroundColor: [
                        "gray",
                        "darkgoldenrod",
                        "red",
                        "darkred",
                    ],
                    data: Object.values(data) as any,
                }]
            },
            options: {
                legend: {
                    display: false
                },
            }
        });
    }
}
