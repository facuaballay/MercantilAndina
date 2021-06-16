import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaDisponibleComponent } from './cobertura-disponible.component';

describe('CoberturaDisponibleComponent', () => {
  let component: CoberturaDisponibleComponent;
  let fixture: ComponentFixture<CoberturaDisponibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoberturaDisponibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoberturaDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
