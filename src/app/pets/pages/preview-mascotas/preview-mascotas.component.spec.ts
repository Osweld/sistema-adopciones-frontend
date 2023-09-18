import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMascotasComponent } from './preview-mascotas.component';

describe('PreviewMascotasComponent', () => {
  let component: PreviewMascotasComponent;
  let fixture: ComponentFixture<PreviewMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewMascotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
