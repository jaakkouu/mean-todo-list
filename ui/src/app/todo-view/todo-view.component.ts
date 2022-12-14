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

  onTodoSubmit(event: any) {
    const { value } = event.target;
    event.target.value = '';
    this.addTodo(value);
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe({
      complete: () => this.loadTodos()
    });
  }

  private addTodo(todo: string) {
    this.todoService.createTodo(todo).subscribe({
      complete: () => this.loadTodos()
    });
  }

  private async loadTodos(): Promise<void> {
    this.todoService.getTodos().subscribe({
      next: (todos: APITodo[]) => this.setTodos(todos),
      error: err => console.error(err)
    });
  }

  private setTodos(data: APITodo[]) {
    this.todos = data.map(this.APITodoToUITodo);
  }

  private APITodoToUITodo = (apiTodo: APITodo): UITodo => ({
    ...apiTodo,
    id: apiTodo._id
  });
}
