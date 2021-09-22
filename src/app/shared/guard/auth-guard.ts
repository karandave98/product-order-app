import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlTree, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
// import { CommonService } from '../modules/services/common.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router,
                private commonService: CommonService
        ) { }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const adminLog = this.commonService.isUserLoggedIn();
        if (adminLog) {
            return true;
        }
        this.router.navigate(['non-auth/login/']);
        return false;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const adminLog = this.commonService.isUserLoggedIn();
        if (adminLog) {
            return true;
        }
        this.router.navigate(['non-auth/login/']);
        return false;
    }

}
