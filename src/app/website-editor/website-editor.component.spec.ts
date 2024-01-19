import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteEditorComponent } from './website-editor.component';

describe('WebsiteEditorComponent', () => {
  let component: WebsiteEditorComponent;
  let fixture: ComponentFixture<WebsiteEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebsiteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
