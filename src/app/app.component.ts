import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet/>',
})
export class AppComponent {
  title = 'store';
}
