import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SectionGeneralComponent } from './section-general.component';

describe('SectionGeneralComponent', () => {
  let component: SectionGeneralComponent;
  let fixture: ComponentFixture<SectionGeneralComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
