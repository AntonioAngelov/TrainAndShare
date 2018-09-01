import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dropdownLi = 'nav-item dropdown';
  dropdownMenu = 'dropdown-menu';

  public isAdminView = !!this.authService.getMarterToken();

  public currentUsername: string;
  public userId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  public myTrainings() {
    this.router.navigate(['/trainings', this.authService.getUserId()]);
  }

  public publicTrainings() {
    this.router.navigate(['/trainings/public']);
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public changeView() {
    this.router.navigate(['/home']);

    localStorage.removeItem('masterToken');

    this.isAdminView = !this.isAdminView;
  }

  public activeUsers() {
    this.router.navigate(['admin/users/active']);
  }

  public lockedUsers() {
    this.router.navigate(['admin/users/locked']);
  }
}
