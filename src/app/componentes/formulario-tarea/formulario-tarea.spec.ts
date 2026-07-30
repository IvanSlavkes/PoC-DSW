import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTarea } from './formulario-tarea';

describe('FormularioTarea', () => {
  let component: FormularioTarea;
  let fixture: ComponentFixture<FormularioTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioTarea],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
