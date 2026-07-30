import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTarea } from './item-tarea';

describe('ItemTarea', () => {
  let component: ItemTarea;
  let fixture: ComponentFixture<ItemTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTarea],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemTarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
