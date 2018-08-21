import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { authComponents } from './index';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...authComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
