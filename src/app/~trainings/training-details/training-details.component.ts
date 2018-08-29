import { Component, OnInit } from '@angular/core';
import { Training, User } from '../../models';
import {
  TrainingStoreService,
  UserStoreService
} from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  private readonly userIdParamName = 'userId';
  private readonly trainingIdParamName = 'trainingId';

  public user$: Observable<User>;
  public training: Training;

  private trainingId: string;
  private userId: string;

  private subscribtions: Subscription[] = [];

  constructor(
    private trainingsStoreService: TrainingStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private userStoreService: UserStoreService) { }

  ngOnInit() {
    this.subscribtions.push(
      this.route.params
        .pipe(
          filter(params => !!params),
          take(1)
        )
        .subscribe(params => {
          this.userId = params[this.userIdParamName];
          this.trainingId = params[this.trainingIdParamName];

          const trainingSub = this.trainingsStoreService.getIsTrainingLoaded(this.userId, this.trainingId)
            .subscribe(isLoaded => {
              if (!isLoaded) {
                this.trainingsStoreService.loadTrainingsByUserId(this.userId);
              }

              if (!!trainingSub) {
                trainingSub.unsubscribe();
              }
            });
        })
    )

    ;
    this.subscribtions.push(
      this.trainingsStoreService.getTrainingById(this.userId, this.trainingId)
        .pipe(filter(training => !!training))
        .subscribe(training => {
          this.training = training;

          const userSub = this.userStoreService
            .getIsUserLoaded(this.training.ownerId)
            .subscribe(isLoaded => {
              if (!isLoaded) {
                this.userStoreService.loadUser(this.userId);
              }

              userSub.unsubscribe();
            });
        })
    );

    this.user$ = this.userStoreService.getUser(this.userId);
  }

}
