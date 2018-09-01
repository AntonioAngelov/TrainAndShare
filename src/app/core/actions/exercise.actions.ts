import { Action } from '@ngrx/store';
import { Exercise } from '../../models';

export const CREATE_EXERCISE = 'ExerciseActions: CREATE_EXERCISE';
export const CREATE_EXERCISE_SUCCESS = 'ExerciseActions: CREATE_EXERCISE_SUCCESS';
export const CREATE_EXERCISE_ERROR = 'ExerciseActions: CREATE_EXERCISE_ERROR';

export const DELETE_EXERCISE = 'ExerciseActions: DELETE_EXERCISE';
export const DELETE_EXERCISE_SUCCESS = 'ExerciseActions: DELETE_EXERCISE_SUCCESS';
export const DELETE_EXERCISE_ERROR = 'ExerciseActions: DELETE_EXERCISE_ERROR';

export const LOAD_EXERCISES = 'ExerciseActions: LOAD_EXERCISE';
export const LOAD_EXERCISES_SUCCESS = 'ExerciseActions: LOAD_EXERCISE_SUCCESS';
export const LOAD_EXERCISES_ERROR = 'ExerciseActions: LOAD_EXERCISE_ERROR';

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

export class LoadExercisesAction implements Action {
    public readonly type = LOAD_EXERCISES;

    public payload: {
        trainingId: string;
    };

    constructor(trainingId: string) {
        this.payload = { trainingId };
    }
}

export class LoadExercisesSuccessAction implements Action {
    public readonly type = LOAD_EXERCISES_SUCCESS;

    public payload: {
        exercises: Exercise[]
    };

    constructor(exercises: Exercise[]) {
        this.payload = { exercises };
    }
}

export class LoadExercisesErrorAction implements Action {
    public readonly type = LOAD_EXERCISES_ERROR;

    constructor(public payload: any) { }
}

export class DeleteExerciseAction implements Action {
    public readonly type = DELETE_EXERCISE;

    public payload: {
        exercise: Exercise;
    };

    constructor(exercise: Exercise) {
        this.payload = { exercise };
    }
}

export class DeleteExerciseSuccessAction implements Action {
    public readonly type = DELETE_EXERCISE_SUCCESS;

    public payload: {
        exercise: Exercise
    };

    constructor(exercise: Exercise) {
        this.payload = { exercise };
    }
}

export class DeleteExerciseErrorAction implements Action {
    public readonly type = DELETE_EXERCISE_ERROR;

    constructor(public payload: any) { }
}

export type Actions =
    | CreateExerciseAction
    | CreateExerciseSuccessAction
    | CreateExerciseErrorAction
    | LoadExercisesAction
    | LoadExercisesSuccessAction
    | LoadExercisesErrorAction
    | DeleteExerciseAction
    | DeleteExerciseSuccessAction
    | DeleteExerciseErrorAction;
