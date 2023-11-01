import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesSolicitudComponent } from './ver-detalles-solicitud.component';

describe('VerDetallesSolicitudComponent', () => {
  let component: VerDetallesSolicitudComponent;
  let fixture: ComponentFixture<VerDetallesSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetallesSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDetallesSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
