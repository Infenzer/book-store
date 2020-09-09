import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortBookListComponent } from './short-book-list.component';

describe('ShortBookListComponent', () => {
  let component: ShortBookListComponent;
  let fixture: ComponentFixture<ShortBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
