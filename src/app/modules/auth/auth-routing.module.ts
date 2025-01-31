import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../website/login/login.component';
import { RegisterComponent } from '../../website/register/register.component';
import {
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './jwt.interceptor';
import { redirectAuthGuard } from 'src/app/guards/redirect.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
