import {Component, DestroyRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ButtonType} from "../../../models/buttonType";
import {Button} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import { v4 as uuid } from 'uuid';
import {MultiSelectModule} from "primeng/multiselect";
import {Tag} from "../../../models/tag";
import {Note} from "../../../models/note";
import {NotesService} from "../../../services/notes.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-notes-modal',
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputTextareaModule, CommonModule, InputTextModule, MultiSelectModule],
  templateUrl: './notes-modal.component.html',
  styleUrl: './notes-modal.component.css'
})
export class NotesModalComponent implements OnInit{
  @Input() buttonType!: ButtonType;
  @Input() inputNote!: Note;
  @Output() savingHandler: EventEmitter<any> = new EventEmitter<any>();
  tags!: Tag[];
  form = new FormGroup({
    id: new FormControl<null | string>({value: null, disabled: true}),
    noteText: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    tags: new FormControl<Tag[] | null>(null, [
        Validators.required
    ]),
  })

  constructor(
      private modalService: NgbModal,
      private destroyRef: DestroyRef,
      private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.tags$.pipe(
        takeUntilDestroyed(this.destroyRef)
    ).subscribe((tags) => {
      this.tags = tags
    })
    if (this.inputNote) this.patchValues(this.inputNote)
  }

  private patchValues(note: Note): void {
    this.form.patchValue({
      id: note.id,
      noteText: note.noteText,
      tags: note.tags
    })
  }

  public saveData(): void {
    const modalData = this.form.getRawValue()
    modalData.id = this.inputNote ? modalData.id : uuid()
    this.savingHandler.emit(modalData)
    this.closeModal()
    console.log('hi')
  }

  public closeModal(): void {
    this.modalService.dismissAll()
  }

}
