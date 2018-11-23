import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from '@app/shared';

@Component({
  selector: 'app-host-for-test',
  template: ''
})
class HostComponent {
  actionHandler = () => {};
}

describe('BigInputActionComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  const getButton = () => fixture.debugElement.query(By.css('button'));
  const getIcon = () => fixture.debugElement.query(By.css('mat-icon'));
  const getLabel = () => fixture.debugElement.query(By.css('.mat-button-wrapper > span'));

  function createHostComponent(template: string): ComponentFixture<HostComponent> {
    TestBed.overrideComponent(HostComponent, { set: { template: template } });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [SharedModule]
    })
  );

  it('should be created', () => {
    const template = '<app-big-input-action></app-big-input-action>';
    fixture = createHostComponent(template);
    expect(component).toBeTruthy();
  });

  it('should initially not be disabled and show no icon or label', () => {
    const template = '<app-big-input-action></app-big-input-action>';
    fixture = createHostComponent(template);
    expect(getButton().nativeElement.disabled).toBeFalsy();
    expect(getIcon()).toBeNull();
    expect(getLabel()).toBeNull();
  });

  it('should disable button if disabled property is set', () => {
    const template = '<app-big-input-action [disabled]="true"></app-big-input-action>';
    fixture = createHostComponent(template);
    expect(getButton().nativeElement.disabled).toBeTruthy();
  });

  it('should display icon if fontSet and fontIcon properties are set', () => {
    const template = `<app-big-input-action fontSet="fas" fontIcon="fa-trash"></app-big-input-action>`;
    fixture = createHostComponent(template);
    expect(getIcon()).toBeTruthy();
    expect(getIcon().nativeElement.classList.contains('fa-trash')).toBeTruthy();
    expect(getIcon().nativeElement.classList.contains('fas')).toBeTruthy();
  });

  it('should display label with provided text when label property is set', () => {
    const template = `<app-big-input-action label="delete"></app-big-input-action>`;
    fixture = createHostComponent(template);
    expect(getLabel()).toBeTruthy();
    expect(getLabel().nativeElement.textContent).toBe('delete');
  });

  it('should emit action event on button click', () => {
    const template = `<app-big-input-action (action)="actionHandler()"></app-big-input-action>`;
    fixture = createHostComponent(template);
    spyOn(component, 'actionHandler').and.callThrough();
    getButton().triggerEventHandler('click', {});
    expect(component.actionHandler).toHaveBeenCalled();
  });
});
