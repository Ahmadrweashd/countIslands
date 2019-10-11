import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixListsComponent } from './matrix-lists.component';

describe('MatrixListsComponent', () => {
  let component: MatrixListsComponent;
  let fixture: ComponentFixture<MatrixListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
