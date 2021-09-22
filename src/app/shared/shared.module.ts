import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule
  ]
})
export class SharedModule { }
