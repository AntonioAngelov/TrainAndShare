import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import * as ExercisesActions from '../actions/exercise.actions';

import { ExerciseService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class ExerciseEffects {

    @Effect()
    public create$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExercisesActions.CREATE_EXERCISE)
            , map((action: ExercisesActions.CreateExerciseAction) => action.payload.exercise)
            , concatMap((exercise) => this.exerciserService.createTraining(exercise))
            , map((exercise) => {
                return new ExercisesActions.CreateExerciseSuccessAction(exercise);
            })
            , catchError(err => of(new ExercisesActions.CreateExerciseErrorAction(err)))
        );

    @Effect()
    public delete$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExercisesActions.DELETE_EXERCISE)
            , map((action: ExercisesActions.DeleteExerciseAction) => action.payload.exercise)
            , concatMap((exercise) => this.exerciserService.deleteExercise(exercise))
            , map((exercise) => new ExercisesActions.DeleteExerciseSuccessAction(exercise))
            , catchError(err => of(new ExercisesActions.DeleteExerciseErrorAction(err)))
        );

    @Effect()
    public loadExercises$: Observable<Action> = this.actions$
        .pipe(
            ofType(ExercisesActions.LOAD_EXERCISES)
            , map((action: ExercisesActions.LoadExercisesAction) => action.payload.trainingId)
            , concatMap((trainingId) => this.exerciserService.getExercisesByTrainingId(trainingId))
            , map((exercise) => new ExercisesActions.LoadExercisesSuccessAction(exercise))
            , catchError(err => of(new ExercisesActions.LoadExercisesErrorAction(err)))
        );

    constructor(
        private actions$: Actions,
        private exerciserService: ExerciseService,
        private router: Router) { }
}
