import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Button} from "primeng/button";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Note} from "../../../models/note";
import {Observable} from "rxjs";
import {NotesService} from "../../../services/notes.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {ListboxModule} from "primeng/listbox";
import {CalendarModule} from "primeng/calendar";

@Component({
    selector: 'app-notifications-modal',
    standalone: true,
    imports: [
        Button,
        ReactiveFormsModule,
        AsyncPipe,
        NgIf,
        ListboxModule,
        CalendarModule
    ],
    templateUrl: './notifications-modal.component.html',
    styleUrl: './notifications-modal.component.css'
})
export class NotificationsModalComponent implements OnInit{
    @Output() savingHandler: EventEmitter<any> = new EventEmitter<any>();
    public notesObservable$!: Observable<Note[]>;

    form = new FormGroup({
        time: new FormControl<Date | null>(null, [
            Validators.required,
        ]),
        selectedNote: new FormControl<Note | null>(null, [
            Validators.required
        ]),
    })

    constructor(private modalService: NgbModal, private notesService: NotesService) {
    }

    ngOnInit() {
        this.notesObservable$ = this.notesService.notes$
    }

    public saveData(): void {
        const tt2 = this.form.getRawValue().time?.toString()
        const modData = {...this.form.getRawValue(), time: tt2}
        this.savingHandler.emit(modData)
        this.closeModal()
    }

    public closeModal(): void {
        this.modalService.dismissAll()
    }

}
