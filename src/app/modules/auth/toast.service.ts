import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from 'src/app/shared/models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'ok',
    duration: number = 3000
  ) {
    this.toastSubject.next({ message, type, duration });

    setTimeout(() => {
      this.clearTimeOut();
    }, duration);
  }
  clearTimeOut() {
    this.toastSubject.next(null);
  }
}
