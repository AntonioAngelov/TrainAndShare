import { Action } from '@ngrx/store';

export const CREATE_EXERCISE = 'ExerciseActions: CREATE_EXERCISE';
export const CREATE_EXERCISE_SUCCESS = 'ExerciseActions: CREATE_EXERCISE_SUCCESS';
export const CREATE_EXERCISE_ERROR = 'ExerciseActions: CREATE_EXERCISE_ERROR';

export class CreateExerciseAction implements Action {
    public readonly type = CREATE_EXERCISE;

    public payload: {
        name: string;
        description: string;
        instructions: string;
    };

    constructor(name: string, description: string, instructions: string) {
        this.payload = { name, description, instructions };
    }
}