import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barra } from './barra';

describe('Barra', () => {
  let component: Barra;
  let fixture: ComponentFixture<Barra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barra],
    }).compileComponents();

    fixture = TestBed.createComponent(Barra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
