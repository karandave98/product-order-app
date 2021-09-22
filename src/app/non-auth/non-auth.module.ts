import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonAuthRoutingModule } from './non-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NonAuthRoutingModule,
    SharedModule
  ]
})
export class NonAuthModule { }
