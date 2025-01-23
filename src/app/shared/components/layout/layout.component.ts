import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthServicesModule } from 'src/app/modules/auth/auth-services.module';
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, ToastComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isAuthenticated = false;
constructor(private authService: AuthServicesModule){}
ngOnInit():void{
this.isAuthenticated = this.authService.isAuthenticated();
}
}
