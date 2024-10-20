import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddsongPage } from './addsong.page';

describe('AddsongPage', () => {
  let component: AddsongPage;
  let fixture: ComponentFixture<AddsongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
