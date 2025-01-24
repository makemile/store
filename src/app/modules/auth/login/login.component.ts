import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormInputComponent } from 'src/app/shared/form_input/form-input.component';
import { userLogin } from 'src/app/shared/models/user.model';
import { AuthService} from '../auth-services.module';

@Component({
  selector: 'app-login',
  imports: [FormInputComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const userData: userLogin = this.loginForm.value;
    if (Object.values(this.loginForm.value).every((value) => value !== '')) {
      this.authService.loginUser(userData).subscribe({
        next: () => {
        this.router.navigate(['']);
        },
        error: (error) => {
          console.log('Usuario no registrado', error);
        },
        complete: () => {
          console.log('operacion exitosa');
        },
      });
      this.loginForm.reset();
    } else {
      console.log('inserte los valores');
    }
  }
}
