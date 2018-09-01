import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { AdminActiveUsersComponent } from './admin-active-users/admin-active-users.component';
import { RouterModule } from '@angular/router';
import { AdminService } from '../core/services/admin.service';
import { AdminLockedUsersComponent } from './admin-locked-users/admin-locked-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AdminBaseComponent, AdminActiveUsersComponent, AdminLockedUsersComponent]
})
export class AdminModule { }
