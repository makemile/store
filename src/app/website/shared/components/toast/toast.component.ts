import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastService } from 'src/app/modules/auth/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',

})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' | 'ok' = 'info';
  @Input() duration = 3000;

  visable: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast) => {
      if (toast) {
        (this.message = toast.message),
          (this.type = toast.type),
          (this.visable = true);
        setTimeout(() => (this.visable = false), toast.duration || 3000);
      }
    });
  }

  closeToast() {
    this.visable = false;
  }

  get toastClass() {
    const baseClass = 'bg-white border text-gray-700';
    if (this.type === 'success' || 'ok') return `${baseClass} border-green-500`;
    if (this.type === 'error') return `${baseClass} border-red-500`;
    return `${baseClass} border-blue-500`;
  }
}
