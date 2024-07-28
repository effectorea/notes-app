import {Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NotesModalComponent} from "./notes-modal/notes-modal.component";
import {ButtonType} from "../../models/buttonType";
import {CommonModule} from "@angular/common";
import {Note} from "../../models/note";
import {NotesService} from "../../services/notes.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {CardModule} from "primeng/card";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ChipModule} from "primeng/chip";

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [
        Button,
        DialogModule,
        CommonModule,
        CardModule,
        ScrollPanelModule,
        ChipModule
    ],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
    protected buttonType: ButtonType = null;
    public notesObservable$!: Observable<Note[]>;

    private modalRef!: NgbModalRef;
    modalOptions: NgbModalOptions = {
        size: 'md',
        backdrop: 'static',
        keyboard: false,
        animation: true,
        centered: true
    };

    constructor(private modalService: NgbModal, private notesService: NotesService, private destroyRef: DestroyRef) {
    }

    ngOnInit() {
        this.notesObservable$ = this.notesService.notes$
        this.renewNotes()
    }

    private renewNotes(): void {
        this.notesService.getAllNotesFromStorage().pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((res) => {
            this.notesService.setAllNotes(res)
        })
    }

    public showDialog(buttonType: ButtonType, note?: Note): void {
        this.buttonType = buttonType
        this.modalRef = this.modalService.open(NotesModalComponent, this.modalOptions);
        this.modalRef.componentInstance.buttonType = this.buttonType
        if (this.buttonType === 'Редактировать') this.modalRef.componentInstance.inputNote = note
        this.modalRef.componentInstance.savingHandler.subscribe((resultFromModal: any) => {
            const noteNew = new Note(resultFromModal.id, resultFromModal.noteText, resultFromModal.tags, null)
            this.buttonType === 'Добавить' ? this.notesService.saveNote(noteNew) : this.notesService.editNote(noteNew)
        })
    }

    public deleteNote(note: Note): void {
        this.notesService.deleteNote(note)
    }

}
