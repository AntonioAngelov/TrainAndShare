import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../../models';
import { ExerciseStoreService } from '../../core/services';
import { Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public exercise: Exercise;

  constructor(
    private route: ActivatedRoute,
    private exericseStoreService: ExerciseStoreService) {

  }

  ngOnInit() {
    this.subscriptions
      .push(this.route.params
        .pipe(switchMap(params => {
          const exerciseId = params['exerciseId'];
          const trainingId = params['trainingId'];

          return this.exericseStoreService.getExercise(exerciseId, trainingId);
        }))
      .pipe(filter(exercise => !!exercise))
      .subscribe(exercise => this.exercise = exercise));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
