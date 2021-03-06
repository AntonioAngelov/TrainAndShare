import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingsState } from '../reducers/training.reducer';
import { Training } from '../../../models';

export const getTrainingsState = createFeatureSelector<TrainingsState>('trainings');

export const getTrainingsByUserIdState = createSelector(
    getTrainingsState,
    (state) => state.trainingsByUserId
);

export const getAreTrainingLoadedByUserId = createSelector(
    getTrainingsByUserIdState,
    (trainings) => (userId: string) => !!trainings[userId]
);

export const getTrainingsByUserId = createSelector(
    getTrainingsByUserIdState,
    (trainings) => (userId: string) => {
        let filteredTrainings: Training[] = [];

        if (!!trainings[userId]) {
            filteredTrainings = trainings[userId];
        }

        return filteredTrainings;
    }
);

 export const getIsTrainingLoaded = createSelector(
    getTrainingsByUserIdState,
    (trainings) =>
        (userId: string, trainingId: string) =>
        !!trainings[userId] && !!trainings[userId]
             .find(training => training._id === trainingId)
 );

export const getTrainingById = createSelector(
    getTrainingsByUserIdState,
     (trainings) =>
         (userId: string, trainingId: string) =>
         !!trainings[userId]
         ? trainings[userId].find(training => training._id === trainingId)
         : null
    );

