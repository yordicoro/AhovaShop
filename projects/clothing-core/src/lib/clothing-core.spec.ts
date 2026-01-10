import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingCore } from './clothing-core';

describe('ClothingCore', () => {
  let component: ClothingCore;
  let fixture: ComponentFixture<ClothingCore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingCore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothingCore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
