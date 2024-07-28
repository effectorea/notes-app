export class Note {
    id: string
    noteText: string
    tags: string[] | []
    time: Date | null

    constructor(id: string, noteText: string, tags: string[] | [], time: Date | null) {
        this.id = id;
        this.noteText = noteText;
        this.tags = tags;
        this.time = time;
    }
}