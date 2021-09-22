import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from 'src/app/models/user.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  adminLoggedIn = new BehaviorSubject<any>(null);
  loaderShowHide = new BehaviorSubject<boolean>(false);
  constructor(
    private storage: StorageService
  ) { }

  setLoggedInAdmin(admin: UserInterface): void {
    this.storage.set('user', JSON.stringify(admin));
    this.storage.set('userName', admin.userName);
    this.storage.set('userEmail', admin.email);
    this.storage.set('id', admin.id);
    const timeinMili = new Date().getTime();
    this.storage.set('loggedInTime', timeinMili);
    this.adminLoggedIn.next(admin);
  }

  getLoggedInAdmin(): BehaviorSubject<any> {
    const adminObj = JSON.parse(this.storage.get('user') ? this.storage.get('user') : null);
    this.adminLoggedIn.next(adminObj);
    return this.adminLoggedIn;
  }

  isUserLoggedIn(): boolean {
    let adminObj = this.storage.get('user') ? this.storage.get('user') : null;
    adminObj = JSON.parse(adminObj);
    if (adminObj && adminObj.id) {
      return true;
    }
    return false;
  }

  logOut(): void {
    this.storage.clear();
  }

  showLoader(): void {
    this.loaderShowHide.next(true);
  }

  hideLoader(): void {
    this.loaderShowHide.next(false);
  }

  getLoaderEvent(): any {
    return this.loaderShowHide;
  }
}
