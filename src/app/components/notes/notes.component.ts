import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NotesModalComponent} from "./notes-modal/notes-modal.component";
import {ButtonType} from "../../models/buttonType";

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [
        Button,
        DialogModule,
    ],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.css'
})
export class NotesComponent {
    protected buttonType: ButtonType = null;

    private modalRef!: NgbModalRef;
    modalOptions: NgbModalOptions = {
        size: 'md',
        backdrop: 'static',
        keyboard: false,
        animation: true,
        centered: true
    };

    constructor(private modalService: NgbModal) {
    }

    public showDialog(buttonType: ButtonType): void {
        this.buttonType = buttonType
        this.modalRef = this.modalService.open(NotesModalComponent, this.modalOptions);
        this.modalRef.componentInstance.buttonType = this.buttonType
    }


}
