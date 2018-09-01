import { Injectable } from '@angular/core';
import * as fromRoot from '../state';
import { Store } from '@ngrx/store';
import { Exercise } from '../../models';
import * as ExercisesActions from '../actions/exercise.actions';
import * as exrciseSelectors from '../state/selectors/exercise.selectors';

@Injectable()
export class ExerciseStoreService {
    constructor(private store: Store<fromRoot.AppState>) {}

    public createExercise(exercise: Exercise) {
        this.store.dispatch(new ExercisesActions.CreateExerciseAction(exercise));
    }

    public deleteExercise(exercise: Exercise) {
        this.store.dispatch(new ExercisesActions.DeleteExerciseAction(exercise));
    }

    public getAreExercisesLoadedByTrainingId(trainingId: string) {
        return this.store.select((state) => exrciseSelectors.getAreExercisesByTrainingIdLoaded(state)(trainingId));
    }

    public getExercisesLoadedByTrainingId(trainingId: string) {
        return this.store.select((state) => exrciseSelectors.getExercisesByTrainingId(state)(trainingId));
    }

    public loadExercisesByTrainingId(trainingId: string) {
        this.store.dispatch(new ExercisesActions.LoadExercisesAction(trainingId));
    }

    public getExercise(exerciseId: string, trainingId: string) {
        return this.store.select((state) => exrciseSelectors.getExercise(state)(exerciseId, trainingId));
    }
}
