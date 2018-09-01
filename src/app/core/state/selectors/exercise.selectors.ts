import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExercisesState } from '../reducers/exercise.reducer';
import { Exercise } from '../../../models';

export const getExercisesState = createFeatureSelector<ExercisesState>('exercises');

export const getExercisesByIdState = createSelector(
    getExercisesState,
    (state) => state.exercisesByTainingId
);

export const getAreExercisesByTrainingIdLoaded = createSelector(
    getExercisesByIdState,
    (exercises) => (trainingId: string) => !!exercises[trainingId]
);


export const getExercisesByTrainingId = createSelector(
    getExercisesByIdState,
    (exercises) => (trainingId: string) => {
        let filteredExercises: Exercise[] = [];

        if (!!exercises[trainingId]) {
            filteredExercises = exercises[trainingId];
        }

        return filteredExercises;
    }
);

export const getExercise = createSelector(
    getExercisesByIdState,
    (exercises) => (exerciseId: string, trainingId: string) => {
        if (!!exercises[trainingId]) {
            return exercises[trainingId].filter(e => e._id === exerciseId)[0];
        }

        return null;
    }
);

