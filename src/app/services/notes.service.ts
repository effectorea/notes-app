import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Note} from "../models/note";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([])
  notes$: Observable<Note[]> = this.notes.asObservable()

  constructor() { }
  
  getAllNotesFromStorage(): Observable<Note[]> {
    return new Observable<Note[]>(subscriber => {
      const notes = localStorage.getItem('notes')
      console.log('Notes from storage', notes);
      if (notes) {
        subscriber.next(JSON.parse(notes))
      }
    })
  }

  setAllNotes(notes: Note[]): void {
    this.notes.next(notes)
  }

  saveNote(note: Note): void {
    const oldNotesArr = this.notes.getValue()
    const newArr = JSON.parse(JSON.stringify(oldNotesArr))
    newArr.push(note)
    localStorage.setItem('notes', JSON.stringify(newArr))
    this.notes.next(newArr)
  }

  deleteNote(note: Note): void {
    const oldNotesArr = this.notes.getValue()
    const newArr = oldNotesArr.filter((element) => element.id !== note.id)
    localStorage.setItem('notes', JSON.stringify(newArr))
    this.notes.next(newArr)
  }

  editNote(note: Note): void {
    const oldNotesArr = this.notes.getValue()
    const newArr = oldNotesArr.map((element) => {
      if (element.id === note.id) {
        element.noteText = note.noteText
        element.tags = note.tags
        return element
      }
      return element
    })
    localStorage.setItem('notes', JSON.stringify(newArr))
    this.notes.next(newArr)
  }
}
