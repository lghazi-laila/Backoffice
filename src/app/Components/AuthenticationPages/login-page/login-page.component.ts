import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { SignInRequest } from 'src/app/Models/SignInRequest';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  signInRequest!: SignInRequest;
  
  constructor(
    private fb: NonNullableFormBuilder, 
    private userAuthService: UserAuthenticationService
    ) {}

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  Login(): void {
    if (this.validateForm.valid) {
      const emailControl = this.validateForm.get("email");
      const passwordControl = this.validateForm.get("password");
      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        this.userAuthService.authenticate(email, password).subscribe(
          (data) =>{
            console.log(data);
          },
          (error) =>{
            console.error(error);
          }
        )
      }//else if controls are not valid ?

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
