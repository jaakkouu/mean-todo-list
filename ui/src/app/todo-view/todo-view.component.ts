import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    this.loadTodos();
  }

  private async loadTodos() {
    this.todoService.getTodos().subscribe(res => this.setTodos(res));
  }

  private setTodos(todos: Todo[]) {
    this.todos = todos;
  }
}
