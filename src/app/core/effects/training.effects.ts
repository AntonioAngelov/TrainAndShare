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
            , map((action: TrainingActions.CreateTrainingAction) => action.payload.training)
            , concatMap((training) => this.trainingService.createTraining(training))
            , map((training) => new TrainingActions.CreateTrainingSuccessAction(training))
            , catchError(err => of(new TrainingActions.CreateTrainingErrorAction(err)))
        );

    @Effect()
    public loadTrainingsByUserId$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrainingActions.LOAD_TRAININGS_BY_USER_ID)
            , map((action: TrainingActions.LoadTrainingsByUserIdAction) => action.payload.userId)
            , concatMap((userId) => this.trainingService.getTrainingsByUserId(userId))
            , map((trainings) => new TrainingActions.LoadTrainingsByUserIdSuccessAction(trainings))
            , catchError(err => of(new TrainingActions.LoadTrainingsByUserIdErrorAction(err)))
        );

    @Effect()
    public delete$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrainingActions.DELETE_TRAINING)
            , map((action: TrainingActions.DeleteTrainingAction) => action.payload.training)
            , concatMap((training) => this.trainingService.deleteTraining(training))
            , map((training) => new TrainingActions.DeleteTrainingSuccessAction(training))
            , catchError(err => of(new TrainingActions.DeleteTrainingErrorAction(err)))
        );

    @Effect()
    public edit$: Observable<Action> = this.actions$
        .pipe(
            ofType(TrainingActions.EDIT_TRAINING)
            , map((action: TrainingActions.EditTrainingAction) => action.payload.training)
            , concatMap((training) => this.trainingService.editTraining(training))
            , map((training) => new TrainingActions.EditTrainingSuccessAction(training))
            , catchError(err => of(new TrainingActions.EditTrainingErrorAction(err)))
        );

    constructor(
        private actions$: Actions,
        private trainingService: TrainingService) { }
}
