import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../services/todo/todo.service';
import { TodoViewComponent } from './todo-view.component';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoViewComponent],
      providers: [TodoService, HttpClient],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoViewComponent);
    fixture.componentInstance.todos = [
      { id: 'id', name: 'Todo 1' },
      { id: 'id', name: 'Todo 2' },
      { id: 'id', name: 'Todo 3' }
    ];

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'TODO LIST'
    );
  });

  it('should display list with items, when items found', async () => {
    component.todos = [
      { id: 'id', name: 'Todo 1' },
      { id: 'id', name: 'Todo 2' },
      { id: 'id', name: 'Todo 3' },
      { id: 'id', name: 'Todo 4' }
    ];
    fixture.detectChanges();

    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    const lis: NodeListOf<HTMLLIElement> =
      fixture.nativeElement.querySelectorAll('li');

    expect(ol).toHaveSize(1);
    expect(lis).toHaveSize(4);
  });

  it('should not display list, when no items found', () => {
    component.todos = [];
    fixture.detectChanges();

    const noItemsTextElement: HTMLElement =
      fixture.nativeElement.querySelector('p');

    expect(noItemsTextElement.textContent).toContain(
      'We did not find any todos'
    );
  });
});
