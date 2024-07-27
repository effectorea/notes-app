import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ButtonType} from "../../../models/buttonType";
import {Button} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-notes-modal',
  standalone: true,
  imports: [ReactiveFormsModule, Button, InputTextareaModule, CommonModule, InputTextModule],
  templateUrl: './notes-modal.component.html',
  styleUrl: './notes-modal.component.css'
})
export class NotesModalComponent implements OnInit{
  @Input() buttonType!: ButtonType;
  form = new FormGroup({
    id: new FormControl<null | number>({value: null, disabled: true},
        Validators.required
    ),
    noteText: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    tags: new FormControl<string | null>(null),
  })

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    console.log();

  }

  public saveData(): void {
    const note = {
      id: uuid(),
      noteText: this.form.getRawValue().noteText,
    }

    console.log('This is a new note', note);

  }

  public closeModal(): void {
    this.modalService.dismissAll()
  }

}
