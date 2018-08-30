import { Action } from '@ngrx/store';
import { Training } from '../../models';


export const CREATE_TRAINING = 'Training: CREATE_TRAINING';
export const CREATE_TRAINING_SUCCESS = 'Training: CREATE_TRAINING_SUCCESS';
export const CREATE_TRAINING_ERROR = 'Training: CREATE_TRAINING_ERROR';
export const LOAD_TRAININGS_BY_USER_ID = 'Training: LOAD_TRAININGS_BY_USER_ID';
export const LOAD_TRAININGS_BY_USER_ID_SUCCESS = 'Training: LOAD_TRAININGS_BY_USER_ID_SUCCESS';
export const LOAD_TRAININGS_BY_USER_ID_ERROR = 'Training: LOAD_TRAININGS_BY_USER_ID_ERROR';

export const DELETE_TRAINING = 'Training: DELETE_TRAINING';
export const DELETE_TRAINING_SUCCESS = 'Training: DELETE_TRAINING_SUCCESS';
export const DELETE_TRAINING_ERROR = 'Training: DELETE_TRAINING_ERROR';

export const EDIT_TRAINING = 'Training: EDIT_TRAINING';
export const EDIT_TRAINING_SUCCESS = 'Training: EDIT_TRAINING_SUCCESS';
export const EDIT_TRAINING_ERROR = 'Training: EDIT_TRAINING_ERROR';

export class CreateTrainingAction implements Action {
    public readonly type = CREATE_TRAINING;

    public payload: {
        training: Training;
    };

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class CreateTrainingSuccessAction implements Action {
    public readonly type = CREATE_TRAINING_SUCCESS;

    constructor(public payload: Object) { }
}

export class CreateTrainingErrorAction implements Action {
    public readonly type = CREATE_TRAINING_ERROR;

    constructor(public payload: any) { }
}

export class LoadTrainingsByUserIdAction implements Action {
    public readonly type = LOAD_TRAININGS_BY_USER_ID;

    public payload: {
        userId: string;
    };

    constructor(public userId: string) {
        this.payload = { userId };
    }
}

export class LoadTrainingsByUserIdSuccessAction implements Action {
    public readonly type = LOAD_TRAININGS_BY_USER_ID_SUCCESS;

    public payload: {
        trainings: Training[];
    };

    constructor(public trainings: Training[]) {
        this.payload = { trainings };
    }
}

export class LoadTrainingsByUserIdErrorAction implements Action {
    public readonly type = LOAD_TRAININGS_BY_USER_ID_ERROR;

    constructor(public payload: any) { }
}

export class DeleteTrainingAction implements Action {
    public readonly type = DELETE_TRAINING;

    public payload: {
        training: Training;
    };

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class DeleteTrainingSuccessAction implements Action {
    public readonly type = DELETE_TRAINING_SUCCESS;

    public payload: {
        training: Training
    };

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class DeleteTrainingErrorAction implements Action {
    public readonly type = DELETE_TRAINING_ERROR;

    constructor(public payload: any) { }
}

export class EditTrainingAction implements Action {
    public readonly type = EDIT_TRAINING;

    public payload: {
        training: Training;
    };

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class EditTrainingSuccessAction implements Action {
    public readonly type = EDIT_TRAINING_SUCCESS;

    public payload: {
        training: Training
    };

    constructor(public training: Training) {
        this.payload = { training };
    }
}

export class EditTrainingErrorAction implements Action {
    public readonly type = EDIT_TRAINING_ERROR;

    constructor(public payload: any) { }
}


export type Actions = CreateTrainingAction
    | CreateTrainingSuccessAction
    | CreateTrainingErrorAction
    | LoadTrainingsByUserIdAction
    | LoadTrainingsByUserIdSuccessAction
    | LoadTrainingsByUserIdErrorAction
    | DeleteTrainingAction
    | DeleteTrainingSuccessAction
    | DeleteTrainingErrorAction
    | EditTrainingAction
    | EditTrainingSuccessAction
    | EditTrainingErrorAction;
