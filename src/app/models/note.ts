import {Tag} from "./tag";

export class Note {
    id: string
    noteText: string
    tags: Tag[] | []
    time: Date | string | null

    constructor(id: string, noteText: string, tags: Tag[] | [], time: Date | string | null) {
        this.id = id;
        this.noteText = noteText;
        this.tags = tags;
        this.time = time;
    }
}