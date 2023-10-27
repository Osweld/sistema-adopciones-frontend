import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAdopcionComponent } from './solicitud-adopcion.component';

describe('SolicitudAdopcionComponent', () => {
  let component: SolicitudAdopcionComponent;
  let fixture: ComponentFixture<SolicitudAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAdopcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
