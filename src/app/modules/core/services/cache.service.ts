import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  saveItemLocal(key: string, item: any): void {
    localStorage.setItem(key, item);
  }

  getItemLocal(key: string): any {
    return localStorage.getItem(key) as string || null;
  }

  cleanLocal(): void {
    localStorage.clear();
  }

  cleanSession(): void {
    sessionStorage.clear();
  }
}
