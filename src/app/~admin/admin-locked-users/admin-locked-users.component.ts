import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { AdminService, AuthService } from '../../core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-locked-users',
  templateUrl: './admin-locked-users.component.html',
  styleUrls: ['./admin-locked-users.component.css']
})
export class AdminLockedUsersComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public users: User[];

  public subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.users$ = this.adminService.getLockedUsers();

    this.subscriptions.push(
      this.users$.subscribe(users => this.users = users)
    );
  }

  public unLockUser(user: User) {
    if (this.authService.getMarterToken()) {
      this.subscriptions.push(
        this.adminService.unLockUser(user._id).subscribe()
      );

      user.isLocked = false;

      this.subscriptions.push(
        this.adminService.setLockedStatus(user).subscribe()
      );

      this.users = this.users.filter(u => u._id !== user._id);
    } else {
      this.toastr.error('No master secret!');
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
