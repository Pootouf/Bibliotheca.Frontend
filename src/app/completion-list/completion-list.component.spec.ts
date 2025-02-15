import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionListComponent } from './completion-list.component';

describe('CompletionListComponent', () => {
  let component: CompletionListComponent;
  let fixture: ComponentFixture<CompletionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
