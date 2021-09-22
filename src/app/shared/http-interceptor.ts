import { CommonService } from './services/common.service';
import { StorageService } from './services/storage.service';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
    urls: string[] = [];
    constructor(private storageSer: StorageService, private commServ: CommonService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.commServ.showLoader();
        const userId = this.storageSer.get('id');
        if (userId) {
            const modifiedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userId}`
                }
            });
            return next.handle(modifiedReq).pipe(
                tap(res => {
                    if (res instanceof HttpResponse) {
                        this.commServ.hideLoader();
                    }
                }),
                catchError(err => {
                    this.commServ.hideLoader();
                    return throwError(err);
                })
            );
        }
        return next.handle(req).pipe(
            tap(res => {
                if (res instanceof HttpResponse) {
                    this.commServ.hideLoader();
                }
            }),
            catchError(err => {
                this.commServ.hideLoader();
                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
