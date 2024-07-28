import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from "primeng/button";
import {TabViewModule} from "primeng/tabview";
import {CommonModule, NgComponentOutlet, NgForOf, NgSwitchCase} from "@angular/common";
import {NotesComponent} from "./components/notes/notes.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {TagsComponent} from "./components/tags/tags.component";
import {TabInterface} from "./models/tabInterface";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        Button,
        TabViewModule,
        NgForOf,
        NotesComponent,
        NgSwitchCase,
        NotificationsComponent,
        TagsComponent,
        NgComponentOutlet,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    public title = 'notes-app';
    public tabs: TabInterface[] = [
        {
            id: 1,
            title: 'Заметки',
            component: NotesComponent
        },
        {
            id: 2,
            title: 'Напоминания',
            component: NotificationsComponent
        },
        {
            id: 3,
            title: 'Теги',
            component: TagsComponent
        }
    ]

    constructor() {
    }

    ngOnInit() {
    }
}
