import {Tag} from "./tag";

export class Note {
    id: string
    noteText: string
    tags: Tag[] | []
    time: Date | null

    constructor(id: string, noteText: string, tags: Tag[] | [], time: Date | null) {
        this.id = id;
        this.noteText = noteText;
        this.tags = tags;
        this.time = time;
    }
}