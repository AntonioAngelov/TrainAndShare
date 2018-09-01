import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { User } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-active-users',
  templateUrl: './admin-active-users.component.html',
  styleUrls: ['./admin-active-users.component.css']
})
export class AdminActiveUsersComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public users: User[];

  public subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.users$ = this.adminService.getActiveUsers();

    this.subscriptions.push(
      this.users$.subscribe(users => this.users = users)
    );
  }

  public lockUser(user: User) {
    if (this.authService.getMarterToken()) {
      this.subscriptions.push(
        this.adminService.lockUser(user._id).subscribe()
      );

      user.isLocked = true;

      this.subscriptions.push(
        this.adminService.setLockedStatus(user).subscribe()
      );

      this.users = this.users.filter(u => u._id !== user._id);
    } else {
      this.toastr.error('No master secret!');
    }
  }

  public makeAdmin(user: User) {
    if (this.authService.getMarterToken()) {
      user.roles.push('Admin');

      this.subscriptions.push(
        this.adminService.makeAdmin(user).subscribe()
      );

      this.users = this.users.filter(u => u._id !== user._id);
      this.users.push(user);

    } else {
      this.toastr.error('No master secret!');
    }
  }

  public isAdmin(user: User) {
    return (user.roles.filter(role => role === 'Admin').length > 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
