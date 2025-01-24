import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from "../shared/components/form_input/form-input.component";
import { user } from 'src/app/models/user.model';
import { AuthService
 } from '../../modules/auth/auth-services.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormInputComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      avatar: new FormControl('', [Validators.required, Validators.pattern('https?://.*')])
    });
  }

  onSubmit(){
   const userData: user = this.registerForm.value;
    if(Object.values(this.registerForm.value).every(value => value !== "")){

      this.authService.createUser(userData)
      .subscribe({
        next: (user) =>{
          console.log(`Bienvenido, ${user.name}! Tu cuenta ha sido creada.`);
          this.router.navigate(['/auth/login'])
        },
        error: (err) => {console.error(err)},
        complete: () => {console.log('complete')}
      });

      this.registerForm.reset();
    }else{
      console.log('complete los campos');
    }

  }
}
