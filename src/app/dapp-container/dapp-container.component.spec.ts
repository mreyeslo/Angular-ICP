import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DappContainerComponent } from './dapp-container.component';

describe('DappContainerComponent', () => {
  let component: DappContainerComponent;
  let fixture: ComponentFixture<DappContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DappContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DappContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
