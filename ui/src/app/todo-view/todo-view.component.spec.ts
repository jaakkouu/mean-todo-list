import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
      'MEAN TODO LIST'
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

    const list: HTMLElement = fixture.nativeElement.querySelector('mat-list');
    const listItems: NodeListOf<HTMLLIElement> =
      fixture.nativeElement.querySelectorAll('mat-list-item');
    const dividers: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('mat-divider');

    expect(list).toHaveSize(1);
    expect(dividers).toHaveSize(3);
    expect(listItems).toHaveSize(4);
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
