import {NotesComponent} from "../components/notes/notes.component";
import {NotificationsComponent} from "../components/notifications/notifications.component";
import {TagsComponent} from "../components/tags/tags.component";

export interface TabInterface {
    id: number
    title: string
    component: any
}