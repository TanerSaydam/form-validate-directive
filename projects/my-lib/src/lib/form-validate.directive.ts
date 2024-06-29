import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[formValidate]',
  standalone: true
})
export class FormValidateDirective {

  @Input("autoValidateMessage") autoValidateMessage: boolean = false;

  constructor(
    private el: ElementRef<HTMLFormElement>
  ) { }
  
  @HostListener('keyup', ['$event'])
  @HostListener('change', ['$event'])
  handleInputEvent(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checkValidation(target);
  }

  @HostListener('submit', ['$event'])
  handleSubmitEvent(event: Event) {
    this.checkValidation();
  }

  private checkValidation(target?: HTMLInputElement) {
    if (target) {
      this.validateElement(target);
    } else {
      // Form submit edildiğinde tüm form elemanlarını kontrol eder
      for (let i = 0; i < this.el.nativeElement.elements.length; i++) {
        const childElement = this.el.nativeElement.elements[i] as HTMLInputElement;
        this.validateElement(childElement);
      }
    }
  }

  private validateElement(element: HTMLInputElement) {
    if (element.validity !== undefined) {
      const elName = `[name=${element.name}] + div`;
      let divEl: any;

      if (element.name !== '') {
        divEl = document.querySelector(elName);
      }

      if (!element.validity.valid) {
        if(this.autoValidateMessage && divEl !== null){
          divEl.innerHTML = element.validationMessage;
        }
                
        element.classList.add('is-invalid');
      } else {
        element.classList.remove('is-invalid');
      }
    }
  }
}