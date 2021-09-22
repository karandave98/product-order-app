import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { delay, startWith } from 'rxjs/operators';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  loaderShowHideSub: any;
  loaderShow = false;
  constructor(
    private commonServ: CommonService,
  ) { }
  ngAfterViewInit(): void {
    this.loaderShowHideSub = this.commonServ.getLoaderEvent().pipe(startWith(null), delay(0)).subscribe((loaderStatus: boolean) => {
      this.loaderShow = (loaderStatus === true);
  });
  }

  ngOnDestroy(): void {
    this.loaderShowHideSub.unsubscribe();
  }
}
