import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Note} from "../models/note";
import {Tag} from "../models/tag";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([])
  notes$: Observable<Note[]> = this.notes.asObservable()

  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([])
  tags$: Observable<Tag[]> = this.tags.asObservable()

  constructor() { }
  
  getAllNotesFromStorage(): Observable<Note[]> {
    return new Observable<Note[]>(subscriber => {
      const notes = localStorage.getItem('notes')
      if (notes) {
        subscriber.next(JSON.parse(notes))
      }
    })
  }

  getAllTagsFromStorage(): Observable<Tag[]> {
    return new Observable<Tag[]>(subscriber => {
      const tags = localStorage.getItem('tags')
      console.log('Tags from storage', tags);
      if (tags) {
        subscriber.next(JSON.parse(tags))
      }
    })
  }

  setAllTags(tags: Tag[]): void {
    this.tags.next(tags)
  }

  setAllNotes(notes: Note[]): void {
    this.notes.next(notes)
  }

  saveTag(tag: Tag): void {
    const oldTagsArr = this.tags.getValue()
    const newArr = JSON.parse(JSON.stringify(oldTagsArr))
    newArr.push(tag)
    localStorage.setItem('tags', JSON.stringify(newArr))
    this.tags.next(newArr)
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

  deleteTag(tag: Tag): void {
    const oldTagsArr = this.tags.getValue()
    const newArr = oldTagsArr.filter((element) => element.id !== tag.id)
    localStorage.setItem('tags', JSON.stringify(newArr))
    this.tags.next(newArr)
    const oldNotesArr = this.notes.getValue()
    const newNotesArr = oldNotesArr.filter((elem) => {
      let indicator = false
      elem.tags.forEach((tg) => {
        if (tg.id === tag.id) indicator = true
      })
      if (indicator) return elem
      return
    })
    if (newNotesArr.length > 0) newNotesArr.forEach((item) => this.deleteNote(item))
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
    console.log('hi')
  }

  saveNotification(time: string | Date | null, item: Note): void {
    const oldNotesArr = this.notes.getValue()
    const newArr = oldNotesArr.map((note) => {
      if (note.id === item.id) {
        note.time = time
      }
      return note
    })
    localStorage.setItem('notes', JSON.stringify(newArr))
    this.notes.next(newArr)
  }
}
