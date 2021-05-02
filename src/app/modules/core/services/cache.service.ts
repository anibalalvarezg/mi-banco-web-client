import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  saveItemSession(key: string, item: any): void {
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  getItemSession(key: string): any {
    return JSON.parse(sessionStorage.getItem(key) as string) || null;
  }

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
