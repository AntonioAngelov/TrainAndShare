import { User } from '../../../models';
import * as UserActions from '../../actions/user.actions';

interface UsersById {
    [userId: string]: User;
}

export interface UsersState {
    usersById: UsersById;
}

const initialState: UsersState = {
    usersById: {}
};

export function usersReducer(state: UsersState = initialState, action: UserActions.Actions): UsersState {
    switch (action.type) {
        case UserActions.LOAD_USER_SUCCESS: {
            const user = action.payload.user;
            const userId = user._id;

            const newState = Object.assign({}, state);

            newState.usersById[userId] = user;

            return newState;
        }
        default:
            return state;
    }
}
