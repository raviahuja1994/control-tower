import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogletrackComponent } from './googletrack.component';
import {InputTextModule} from 'primeng/primeng';
describe('GoogletrackComponent', () => {
  let component: GoogletrackComponent;
  let fixture: ComponentFixture<GoogletrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogletrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogletrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
