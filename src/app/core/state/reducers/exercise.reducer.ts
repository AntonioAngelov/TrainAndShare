import { Exercise } from '../../../models';
import * as ExerciseActions from '../../actions/exercise.actions';

interface ExercisesByTrainingId {
    [trainingId: string]: Exercise[];
}

export interface ExercisesState {
    exercisesByTainingId: ExercisesByTrainingId;
}

const initialState: ExercisesState = {
    exercisesByTainingId: {}
};

export function exercisesReducer(state: ExercisesState = initialState, action: ExerciseActions.Actions): ExercisesState {
    switch (action.type) {
        case ExerciseActions.CREATE_EXERCISE_SUCCESS: {
            const newExercise = action.payload.exercise;
            const trainingId = newExercise.trainingId;

            const newState = Object.assign({}, state);

            if (!newState.exercisesByTainingId[trainingId]) {
                newState.exercisesByTainingId[trainingId] = [];
            }

            newState.exercisesByTainingId[trainingId].push(newExercise);

            return newState;
        }
        case ExerciseActions.LOAD_EXERCISES_SUCCESS: {
            const exercises = action.payload.exercises;

            const newState = Object.assign({}, state);

            if (exercises.length > 0) {
                const trainingId = exercises[0].trainingId;
                newState.exercisesByTainingId[trainingId] = exercises;
            }

            return newState;
        }
        case ExerciseActions.DELETE_EXERCISE_SUCCESS: {
            const deletedExerciseId = action.payload.exercise._id;
            const trainingId = action.payload.exercise.trainingId;
            const newState = Object.assign({}, state);

            newState.exercisesByTainingId[trainingId] = newState.exercisesByTainingId[trainingId].filter(e => e._id !== deletedExerciseId);

            return newState;
        }
        default:
            return state;
    }
}
