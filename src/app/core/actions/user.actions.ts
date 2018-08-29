import { Action } from '@ngrx/store';
import { User } from '../../models';

export const LOAD_USER = 'UserActions: LOAD_USER';
export const LOAD_USER_SUCCESS = 'UserActions: LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'UserActions: LOAD_USER_ERROR';

export class LoadUserAction implements Action {
    public readonly type = LOAD_USER;

    public payload: {
        userId: string;
    };

    constructor(userId: string) {
        this.payload = { userId };
    }
}

export class LoadUserSuccessAction implements Action {
    public readonly type = LOAD_USER_SUCCESS;

    public payload: {
        user: User;
    };

    constructor(user: User) {
        this.payload = { user };
    }
}

export class LoadUserErrorAction implements Action {
    public readonly type = LOAD_USER_ERROR;

    constructor(public payload: any) {}
}

export type Actions =
    | LoadUserAction
    | LoadUserSuccessAction
    | LoadUserErrorAction;
