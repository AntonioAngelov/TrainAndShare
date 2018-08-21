import { Action } from '@ngrx/store';
import { Training } from '../../models'


export const CREATE_TRAINING = 'Training: CREATE_TRAINING';
export const CREATE_TRAINING_SUCCESS = 'Training: CREATE_TRAINING_SUCCESS';
export const CREATE_TRAINING_ERROR = 'Training: CREATE_TRAINING_ERROR';

export class CreateTrainingAction implements Action {
    public readonly type = CREATE_TRAINING;

    public payload : {
        training: Training;
    }

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class CreateTrainingSuccessAction implements Action {
    public readonly type = CREATE_TRAINING_SUCCESS;

    constructor(public payload: Training) {}
}

export class CreateTrainingErrorAction implements Action {
    public readonly type = CREATE_TRAINING_ERROR;

    constructor(public payload: any) {}
}

export type Actions = CreateTrainingAction | CreateTrainingSuccessAction | CreateTrainingErrorAction;
