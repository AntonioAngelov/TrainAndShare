import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingStoreService, UserStoreService } from '../../core/services';
import { filter } from 'rxjs/operators';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingsGuard implements CanActivate {
  public userId: string;

  constructor (
    private trainingStoreService: TrainingStoreService,
    private userStoreService: UserStoreService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.userId = route.params['userId'];

      this.userStoreService.getIsUserLoaded(this.userId)
        .subscribe(isLoaded => {
          if (!isLoaded) {
            this.userStoreService.loadUser(this.userId);
          }
        });

      this.trainingStoreService.getAreTrainingsLoadedByUserId(this.userId)
      .subscribe((areLoaded) => {
            if (!areLoaded) {
              this.trainingStoreService.loadTrainingsByUserId(this.userId);
            }
          }
      );

    return true;
  }
}
