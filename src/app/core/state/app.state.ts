import { ActionReducerMap } from '@ngrx/store';
import { TrainingsState, trainigsReducer} from './reducers/training.reducer';
import { UsersState, usersReducer} from './reducers/user.reducer';
export interface AppState {
    trainings: TrainingsState;
    users: UsersState;
}
export const reducers: ActionReducerMap<AppState> = {
    trainings: trainigsReducer,
    users: usersReducer
};
