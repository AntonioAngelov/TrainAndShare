import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingStoreService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingsGuard implements CanActivate {
  public userId: string;

  constructor (private trainingStoreService: TrainingStoreService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.userId = route.params['userId'];

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
