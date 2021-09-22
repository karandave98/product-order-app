import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/models/user.interface';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserLoggedIn = false;
  private subscription = new Subscription();
  constructor(private commonService: CommonService, private router: Router) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAdminDetail();
  }
  getAdminDetail(): void {
    this.subscription.add(this.commonService.getLoggedInAdmin().subscribe((user: UserInterface) => {
        if (user && user.email) {
          this.isUserLoggedIn = true;
        }
      })
    );
  }

  logOut(): void {
    this.commonService.logOut();
    this.isUserLoggedIn = false;
    this.router.navigate(['non-auth/login']);
  }

}
