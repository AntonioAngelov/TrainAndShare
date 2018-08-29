import { Injectable } from '@angular/core';
import * as fromRoot from '../state';
import { Store } from '@ngrx/store';
import { Training } from '../../models';
import * as TrainingActions from '../actions/training.actions';
import * as trainingSelectors from '../state/selectors/training.selectors';

@Injectable()
export class TrainingStoreService {
    constructor(private store: Store<fromRoot.AppState>) {}

    public createTraining(training: Training) {
        this.store.dispatch(new TrainingActions.CreateTrainingAction(training));
    }

    public loadTrainingsByUserId(userId: string) {
        this.store.dispatch(new TrainingActions.LoadTrainingsByUserIdAction(userId));
    }

    public getAreTrainingsLoadedByUserId(userId: string) {
        return this.store.select((state) => trainingSelectors.getAreTrainingLoadedByUserId(state)(userId));
    }

    public getTrainingsByUserId(userId: string) {
        return this.store.select((state) => trainingSelectors.getTrainingsByUserId(state)(userId));
    }

    public getIsTrainingLoaded(userId: string, trainingId: string) {
        return this.store.select((state) => trainingSelectors.getIsTrainingLoaded(state)(userId, trainingId));
    }

    public getTrainingById(userId: string, trainingId: string) {
        return this.store.select((state) => trainingSelectors.getTrainingById(state)(userId, trainingId));
    }
}
