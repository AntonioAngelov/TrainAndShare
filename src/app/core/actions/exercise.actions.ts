import { Action } from '@ngrx/store';
import { Exercise } from '../../models';

export const CREATE_EXERCISE = 'ExerciseActions: CREATE_EXERCISE';
export const CREATE_EXERCISE_SUCCESS = 'ExerciseActions: CREATE_EXERCISE_SUCCESS';
export const CREATE_EXERCISE_ERROR = 'ExerciseActions: CREATE_EXERCISE_ERROR';

export class CreateExerciseAction implements Action {
    public readonly type = CREATE_EXERCISE;

    public payload: {
        exercise: Exercise
    };

    constructor(exercise: Exercise) {
        this.payload = { exercise };
    }
}

export class CreateExerciseSuccessAction implements Action {
    public readonly type = CREATE_EXERCISE_SUCCESS;

    public payload: {
        exercise: Exercise
    };

    constructor(exercise: Exercise) {
        this.payload = { exercise };
    }
}

export class CreateExerciseErrorAction implements Action {
    public readonly type = CREATE_EXERCISE_ERROR;

    constructor(public payload: any) { }
}

export type Actions =
    | CreateExerciseAction
    | CreateExerciseSuccessAction
    | CreateExerciseErrorAction;
