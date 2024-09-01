import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryInsectComponent } from './library.component';

describe('LibraryInsectComponent', () => {
  let component: LibraryInsectComponent;
  let fixture: ComponentFixture<LibraryInsectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryInsectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryInsectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
