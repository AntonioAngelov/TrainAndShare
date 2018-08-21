import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import * as TrainingActions from '../actions/training.actions';

import { TrainingService } from '../services';

@Injectable()
export class TrainingsEffects {

    @Effect()
    public create$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrainingActions.CREATE_TRAINING)
            ,map((action: TrainingActions.CreateTrainingAction) => action.payload.training)
            ,concatMap((training) => this.trainingService.createTraining(training))
            ,map((training) => new TrainingActions.CreateTrainingSuccessAction(training))
            ,catchError(err => of(new TrainingActions.CreateTrainingErrorAction(err)))
        );

    constructor(
        private actions$: Actions,
        private trainingService: TrainingService) { }
}