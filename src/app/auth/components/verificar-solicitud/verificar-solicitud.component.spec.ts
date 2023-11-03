import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarSolicitudComponent } from './verificar-solicitud.component';

describe('VerificarSolicitudComponent', () => {
  let component: VerificarSolicitudComponent;
  let fixture: ComponentFixture<VerificarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
