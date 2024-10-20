import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSongPage } from './addsong.page';

describe('AddsongPage', () => {
  let component: AddSongPage;
  let fixture: ComponentFixture<AddSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
