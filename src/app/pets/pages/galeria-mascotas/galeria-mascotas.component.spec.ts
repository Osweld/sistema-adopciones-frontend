import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaMascotasComponent } from './galeria-mascotas.component';

describe('GaleriaMascotasComponent', () => {
  let component: GaleriaMascotasComponent;
  let fixture: ComponentFixture<GaleriaMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriaMascotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
