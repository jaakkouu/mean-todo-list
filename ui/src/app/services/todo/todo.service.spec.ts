import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UITodo } from '../../models/todo';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('TodoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('knows how to fetch todos', async () => {
    const testData: UITodo[] = [
      { id: 'id', name: 'Todo 1' },
      { id: 'id', name: 'Todo 2' },
      { id: 'id', name: 'Todo 3' }
    ];

    httpClient
      .get<UITodo[]>('http://localhost:8080/todos')
      .subscribe(data => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne('http://localhost:8080/todos');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('knows how to create todos', async () => {
    httpClient
      .post<string>('http://localhost:8080/todo', { todo: 'this is my todo' })
      .subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/todo');

    expect(req.request.method).toEqual('POST');
  });

  it('knows how to delete todos', async () => {
    httpClient.delete<string>('http://localhost:8080/todo/1').subscribe();

    const req = httpTestingController.expectOne('http://localhost:8080/todo/1');

    expect(req.request.method).toEqual('DELETE');
  });
});
