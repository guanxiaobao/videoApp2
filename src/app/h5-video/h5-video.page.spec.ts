import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H5VideoPage } from './h5-video.page';

describe('H5VideoPage', () => {
  let component: H5VideoPage;
  let fixture: ComponentFixture<H5VideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H5VideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H5VideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
