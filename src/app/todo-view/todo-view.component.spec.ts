import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoViewComponent } from './todo-view.component';

describe('TodoViewComponent', () => {
  let component: TodoViewComponent;
  let fixture: ComponentFixture<TodoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain("TODO LIST");
  });

  it('should have list with items', () => {
    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    const lis: NodeListOf<HTMLLIElement> = ol.querySelectorAll("li");
    expect(ol).toHaveSize(1);
    expect(lis).toHaveSize(3);
  });
});
