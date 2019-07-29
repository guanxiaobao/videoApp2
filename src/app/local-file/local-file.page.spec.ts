import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFilePage } from './local-file.page';

describe('LocalFilePage', () => {
  let component: LocalFilePage;
  let fixture: ComponentFixture<LocalFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalFilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
