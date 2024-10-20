import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongdetailPage } from './songdetail.page';

describe('SongdetailPage', () => {
  let component: SongdetailPage;
  let fixture: ComponentFixture<SongdetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SongdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
