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
**Auto Validation Message**
If you want validation messages to be assigned as automatic errors in the browser, you can set the autoValidate attribute to true
```html
<form formValidate [autoValidateMessage]="true" #form="ngForm" autocomplete="off">
```

## Example Usage Full
```html
<form formValidate #form="ngForm" autocomplete="off">
    <div class="form-group">
        Email
        <input class="form-control" name="email" ngModel required email type="email">
        <div class="invalid-feedback">Email is required</div>
    </div>
        <div class="form-group">
            Content
            <textarea class="form-control" name="content" ngModel required minlength="5" cols="30" rows="10"></textarea>
            <div class="invalid-feedback">Password is required</div>
        </div>
    <button class="btn btn-primary">Send</button>
</form>
```

## Note
Thanks to Serap for helping me with this library idea. :) 