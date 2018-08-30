import { ActionReducerMap } from '@ngrx/store';
import { TrainingsState, trainigsReducer} from './reducers/training.reducer';
import { UsersState, usersReducer} from './reducers/user.reducer';
import { ExercisesState, exercisesReducer} from './reducers/exercise.reducer';

export interface AppState {
    trainings: TrainingsState;
    users: UsersState;
    exercises: ExercisesState;
}
export const reducers: ActionReducerMap<AppState> = {
    trainings: trainigsReducer,
    users: usersReducer,
    exercises: exercisesReducer
};
