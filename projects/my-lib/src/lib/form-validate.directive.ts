import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[formValidate]',
  standalone: true
})
export class FormValidateDirective {

  @Input("customValidateMessage") customValidateMessage: boolean = true;
  constructor(
    private el: ElementRef<HTMLFormElement>
  ) { }


  @HostListener("keyup") keyup(){
    this.checkValidation();
  }

  @HostListener("submit") submit(){
    this.checkValidation();
  }

  checkValidation(){
    for(let child in this.el.nativeElement.elements){
      const childElement:any = this.el.nativeElement.elements[child]      
      if(childElement.validity !== undefined){
          const elName:any = "[name=" + childElement.name + "] + div";          
          let divEl : any;
          
          if(childElement.name !== ""){   
            divEl = document.querySelector(elName);
          }         
          
         if(!childElement.validity.valid){   
           if(this.customValidateMessage && divEl !== null)      
             divEl.innerHTML = childElement.validationMessage;
          
          childElement.classList.add("is-invalid");
          childElement.classList.remove("is-valid");
         }else{          
          childElement.classList.add("is-valid");
          childElement.classList.remove("is-invalid");
         }
      }
    }
  }

}
