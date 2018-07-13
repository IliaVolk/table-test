import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { TestData } from 'src/app/data.service';
import { FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    selector: 'test-edit',
    providers: [{
        provide: MAT_LABEL_GLOBAL_OPTIONS,
        useValue: {
            float: 'auto',
        },
    }]
})
export class TestEditComponent {
    form = this.formBuilder.group({
        location: this.formBuilder.control(null),
        owner: this.formBuilder.control(null),
        type: this.formBuilder.control(null),
        date: this.formBuilder.control(null),
        a5: this.formBuilder.control(null),
        act: this.formBuilder.control(null),
        error: this.formBuilder.control(null),
        notes: this.formBuilder.control(null),
        sample_note: this.formBuilder.control(null),
    });
    constructor(@Inject(MAT_DIALOG_DATA) private data: TestData,
                private formBuilder: FormBuilder) {
        this.form.patchValue(data as any);
    }
}
