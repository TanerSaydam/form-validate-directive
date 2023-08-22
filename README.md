# Angular NgForm Validate Directive

## Description
When you give this ``Directive`` to a form element that is ill with ``NgForm``, it checks the validation rules of automatically linked elements and makes the class of those that fail the check ``is-invalid``. At the same time, if there is a div that gives a warning message, it automatically writes the validation error in it by default, if you want, you can write customized errors yourself.

## Import Directive Standalone
```typescript
import { FormValidateDirective } from 'form-validate-angular';

Component({
  imports: [CommonModule, FormsModule, FormValidateDirective],
})
```

## Import Directive Module
```typescript
import { FormValidateDirective } from 'form-validate-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    FormValidateDirective
  ]
})
export class AppModule { }
```


## Example Usage 1
```html
<form formValidate #form="ngForm" autocomplete="off">
```

## Example Usage 2
```html
<form formValidate [customValidateMessage]="false" #form="ngForm" autocomplete="off">
```

## Example Usage Full
```html
<form formValidate #form="ngForm" autocomplete="off">
    <div class="form-group">
        Email
        <input class="form-control" name="email" ngModel required email type="email">
        <div class="invalid-feedback"></div>
    </div>
        <div class="form-group">
            Content
            <textarea class="form-control" name="content" ngModel required minlength="5" cols="30" rows="10"></textarea>
            <div class="invalid-feedback"></div>
        </div>
    <button class="btn btn-primary">Send</button>
</form>
```



## Codes
```typescript
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
```

## Note
Thanks to Serap for helping me with this library idea. :) 