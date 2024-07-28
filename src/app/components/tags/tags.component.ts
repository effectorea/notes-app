import {Component, DestroyRef, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Tag} from "../../models/tag";
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {TagsModalComponent} from "./tags-modal/tags-modal.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    Button,
    TableModule,
    NgForOf,
    NgIf,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
  providers: [ConfirmationService, MessageService]
})
export class TagsComponent implements OnInit{
  public tags!: Tag[];
  cols: ColumnsInterface[] = [
    { field: 'name', header: 'Название тэга' },
    { field: 'id', header: 'Тэг id' },
    { field: 'actions', header: 'Действия' }
  ];
  private modalRef!: NgbModalRef;
  modalOptions: NgbModalOptions = {
    size: 'md',
    backdrop: 'static',
    keyboard: false,
    animation: true,
    centered: true
  };

  constructor(
      private notesService: NotesService,
      private destroyRef: DestroyRef,
      private modalService: NgbModal,
      private confirmationService: ConfirmationService,
      private messageService: MessageService) {
  }

  ngOnInit() {
    this.notesService.tags$.pipe(
        takeUntilDestroyed(this.destroyRef)
    ).subscribe((tags) => {
      this.tags = tags
    })
    this.notesService.getAllTagsFromStorage().pipe(
        takeUntilDestroyed(this.destroyRef)
    ).subscribe((res) => {
      this.notesService.setAllTags(res)
    })
  }

  public createTag(): void {
    this.modalRef = this.modalService.open(TagsModalComponent, this.modalOptions);
    this.modalRef.componentInstance.savingHandler.subscribe((resultFromModal: any) => {
      const tag = new Tag(resultFromModal.id, resultFromModal.name)
      this.notesService.saveTag(tag)
    })
  }

  public deleteTag(tag: Tag): void {
    this.confirmationService.confirm({
      message: 'Удаление тега приведет к удалению всех заметок, использующих его.',
      header: 'Вы действительно хотите удалить тэг?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.notesService.deleteTag(tag)
        this.messageService.add({ severity: 'info', summary: 'Удалено', detail: 'Вы удалили тэг' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Отмена', detail: 'Вы отменили удаление', life: 3000 });
      }
    });
  }

}
