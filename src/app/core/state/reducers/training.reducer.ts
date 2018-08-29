import { Training } from '../../../models';
import * as TrainingActions from '../../actions/training.actions';

interface TrainingsByUserId {
    [userId: string]: Training[];
}

export interface TrainingsState {
    trainingsByUserId: TrainingsByUserId;
}

const initialState: TrainingsState = {
    trainingsByUserId: {}
};

export function trainigsReducer(state: TrainingsState = initialState, action: TrainingActions.Actions): TrainingsState {
    switch (action.type) {
        case TrainingActions.CREATE_TRAINING_SUCCESS: {
            const newTraining = action.payload as Training;
            const userId = newTraining.ownerId;

            const newState = Object.assign({}, state);

            newState.trainingsByUserId[userId] = [...newState.trainingsByUserId[userId], newTraining];

            return newState;
        }
        case TrainingActions.LOAD_TRAININGS_BY_USER_ID_SUCCESS: {
            const trainings = action.payload.trainings;

            let newState = Object.assign({}, state);

            if (!!trainings && trainings.length > 0) {
                const ownerId = trainings[0].ownerId;

                const newTrainingsByUserId: TrainingsByUserId = Object.assign(newState.trainingsByUserId, { [ownerId]: trainings });
                newState = Object.assign(newState, {trainingsByUserId: newTrainingsByUserId});
            }

            return newState;
        }
        default:
            return state;
    }
}
