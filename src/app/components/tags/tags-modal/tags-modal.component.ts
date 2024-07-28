import {Component, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {v4 as uuid} from "uuid";
import {Button} from "primeng/button";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";

@Component({
    selector: 'app-tags-modal',
    standalone: true,
    imports: [
        Button,
        ReactiveFormsModule,
        CommonModule,
        InputTextModule
    ],
    templateUrl: './tags-modal.component.html',
    styleUrl: './tags-modal.component.css'
})
export class TagsModalComponent {
    @Input() savingHandler: EventEmitter<any> = new EventEmitter<any>();
    form = new FormGroup({
        id: new FormControl<null | string>({value: null, disabled: true},
            Validators.required
        ),
        name: new FormControl<string | null>(null, [
            Validators.required,
        ])
    })

    constructor(private modalService: NgbModal) {
    }

    public saveData(): void {
        const modalData = this.form.getRawValue()
        modalData.id = uuid()
        this.savingHandler.emit(modalData)
        this.closeModal()
    }

    public closeModal(): void {
        this.modalService.dismissAll()
    }
}
