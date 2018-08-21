import { Training } from "../../../models";
import * as TrainingActions from '../../actions/training.actions';

interface TrainingsByUserId {
    [userId: string]: Training;
}

export interface TrainingsState {
    trainingsByUserId: TrainingsByUserId;
    userIds: string[]
}

const initialState: TrainingsState = {
    trainingsByUserId: {},
    userIds: []
};

export function trainigsReducer(state: TrainingsState = initialState, action: TrainingActions.Actions): TrainingsState {
    switch (action.type) {
        case TrainingActions.CREATE_TRAINING_SUCCESS: {
            const userId = action.payload.ownerId;
            const newTraining = action.payload;
            const newState = Object.assign({}, state);

            newState.userIds = [...newState.userIds, userId];
            newState.trainingsByUserId[userId] = newTraining;

            return state;
        }        
        default:
            return state;
    }
}