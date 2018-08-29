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

  public currentUsername: string;
  public userId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.currentUsername = this.authService.getUsername();
    this.userId = this.authService.getUserId();
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  public navigate() {
    this.router.navigate(['/trainings', this.userId]);
  }
}
