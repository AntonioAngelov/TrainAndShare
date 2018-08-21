import { Injectable } from "@angular/core";
import * as fromRoot from '../state';
import { Store } from "@ngrx/store";
import { Training } from "../../models";
import * as TrainingActions from '../actions/training.actions';

@Injectable()
export class TrainingStoreService {
    constructor(private store: Store<fromRoot.AppState>) {}

    public createTraining(training: Training) {
        this.store.dispatch(new TrainingActions.CreateTrainingAction(training));
    }
}
