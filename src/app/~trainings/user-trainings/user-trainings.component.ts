import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingStoreService, UserStoreService, AuthService } from '../../core/services';
import { Training, User } from '../../models';
import { Observable } from 'rxjs';
import { UserTrainingsGuard } from './user-trainings.guard';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
  public trainings$: Observable<Training[]>;
  public user: User;
  public canEdit = false;


  constructor(
    private trainingsStoreService: TrainingStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private userTrainingsGuard: UserTrainingsGuard,
    private userStoreService: UserStoreService,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    this.trainings$ = this.trainingsStoreService.getTrainingsByUserId(this.userTrainingsGuard.userId);
    this.userStoreService.getUser(this.userTrainingsGuard.userId)
      .pipe(filter(user => !!user))
      .subscribe(user => this.user = user);

    this.canEdit = this.authenticationService.getUserId() === this.userTrainingsGuard.userId;
  }

  public onCreateNewTraining() {
    this.router.navigate(['../../create'], { relativeTo: this.route });
  }

  public onDeleteTraining(training) {
    this.trainingsStoreService.deleteTraining(training);
  }

  public viewTraining(trainingId: string) {
    this.router.navigate(['details', trainingId], { relativeTo: this.route});
  }
}
