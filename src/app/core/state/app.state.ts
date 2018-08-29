import { ActionReducerMap } from '@ngrx/store';
import { TrainingsState, trainigsReducer} from './reducers/training.reducer';
export interface AppState {
    trainings: TrainingsState;
}
export const reducers: ActionReducerMap<AppState> = {
    trainings: trainigsReducer
};
