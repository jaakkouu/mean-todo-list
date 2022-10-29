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

  const typeToTodoInput = (text: string) => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    input.value = text;
    input.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display toolbar with title', () => {
    const toolbar: HTMLElement =
      fixture.nativeElement.querySelector('mat-toolbar');

    expect(toolbar.textContent).toContain('MEAN TODO LIST');
    expect(toolbar).toHaveSize(1);
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

  it('should display input field field', () => {
    const matFormField: HTMLElement =
      fixture.nativeElement.querySelectorAll('mat-form-field');
    expect(matFormField).toHaveSize(1);
  });

  it('creates todos, when enter is pressed', () => {
    const text = 'testing if pressing enter submits';
    typeToTodoInput(text);

    const onTodoSubmitSpy = spyOn(component, 'onTodoSubmit');
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    input.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    fixture.detectChanges();

    expect(onTodoSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('clears todo input, when todo is created', () => {
    typeToTodoInput('test');

    const inputBeforeSubmit: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    inputBeforeSubmit.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter'
      })
    );

    fixture.detectChanges();

    const inputAfterSubmit: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    expect(inputAfterSubmit.value).toBe('');
  });
});
