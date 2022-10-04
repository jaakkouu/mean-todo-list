import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [
    {
      name: 'Item 1'
    },
    {
      name: 'Item 2'
    },
    {
      name: 'Item 3'
    }
  ];

  constructor() {}

  getTodos(): Todo[] {
    return this.todos;
  }
}
