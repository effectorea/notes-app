import {Component, OnInit} from '@angular/core';
import {Note} from "../../models/note";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Button} from "primeng/button";
import {map, Observable, tap} from "rxjs";
import {NotesService} from "../../services/notes.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {NotificationsModalComponent} from "./notifications-modal/notifications-modal.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    Button,
    AsyncPipe,
    TableModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{

  private modalRef!: NgbModalRef;
  modalOptions: NgbModalOptions = {
    size: 'xl',
    backdrop: 'static',
    keyboard: false,
    animation: true,
    centered: true
  };

  public cols: ColumnsInterface[] = [
    { field: 'time', header: 'Время' },
    { field: 'noteText', header: 'Заметка' },
    { field: 'actions', header: 'Действие' }
  ];

  public notesObservable$!: Observable<Note[]>;

  constructor(private notesService: NotesService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.notesObservable$ = this.notesService.notes$.pipe(
        map((notes: Note[]) => {
          return notes.filter((note: Note) => {
            if (note.time) return note
            return
          })
        }),
        tap((res) => console.log('This is a result', res))
    )
  }

  public showDialog(): void {
    this.modalRef = this.modalService.open(NotificationsModalComponent, this.modalOptions);
    this.modalRef.componentInstance.savingHandler.subscribe((resultFromModal: any) => {
      this.notesService.saveNotification(resultFromModal.time, resultFromModal.selectedNote)
    })
  }

  public deleteNotification(noteItem: Note): void {
    this.notesService.saveNotification(null, noteItem)
  }
}
