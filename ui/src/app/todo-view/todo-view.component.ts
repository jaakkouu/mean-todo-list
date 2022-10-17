import { Component, OnInit } from '@angular/core';
import { APITodo, UITodo } from '../models/todo';
import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {
  todos: UITodo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  private async loadTodos() {
    this.todoService.getTodos().subscribe({
      next: this.setTodos,
      error: console.error
    });
  }

  private setTodos(data: APITodo[]) {
    this.todos = data.map(this.APITodoToUITodo);
  }

  private APITodoToUITodo = (apiTodo: APITodo) => ({
    ...apiTodo,
    id: apiTodo._id
  });
}
