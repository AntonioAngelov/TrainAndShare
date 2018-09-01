import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/core/services';
import { Training } from '../../models';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-trainings',
  templateUrl: './public-trainings.component.html',
  styleUrls: ['./public-trainings.component.css']
})
export class PublicTrainingsComponent implements OnInit, OnDestroy {
  public pageSize = 5;
  public currentPage = 1;

  private subscriptions: Subscription[] = [];
  public trainings: Training[];

  constructor(
    private trainingService: TrainingService,
    public router: Router) { }

  ngOnInit() {
    this.subscriptions.push(
      this.trainingService.getPublicTrainings()
        .pipe(
          filter(trainings => !!trainings)
        )
        .subscribe(trainings => this.trainings = trainings)
    );
  }

  public pageChanged(newPage: number): void {
    this.currentPage = newPage;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public viewTraining(training: Training) {
    this.router.navigate(['trainings', training.ownerId, 'details', training._id]);
  }
}
