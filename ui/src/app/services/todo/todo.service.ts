import { Injectable } from '@angular/core';
import { APITodo } from '../../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<APITodo[]> {
    return this.http.get<APITodo[]>(`${this.BASE_URL}/todos`);
  }
}
