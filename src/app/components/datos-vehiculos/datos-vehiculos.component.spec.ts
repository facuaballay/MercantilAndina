import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosVehiculosComponent } from './datos-vehiculos.component';

describe('DatosVehiculosComponent', () => {
  let component: DatosVehiculosComponent;
  let fixture: ComponentFixture<DatosVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
