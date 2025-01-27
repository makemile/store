import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isLocalStorageAvailable: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    this.isLocalStorageAvailable = isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    } else {
      console.log('localStorage no disponible');
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    }
  }
}
