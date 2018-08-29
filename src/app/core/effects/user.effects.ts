import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import * as UserActions from '../actions/user.actions';
import { UserService } from '../services';

@Injectable()
export class UserEffects {
    @Effect()
    public loadUser$: Observable<Action> = this.actions$
        .pipe(
            ofType(UserActions.LOAD_USER)
            , map((action: UserActions.LoadUserAction) => action.payload.userId)
            , concatMap((userId) => this.userService.getUser(userId))
            , map((user) => new UserActions.LoadUserSuccessAction(user))
            , catchError(err => of(new UserActions.LoadUserErrorAction(err)))
        );

    constructor(
        private actions$: Actions,
        private userService: UserService) { }
}
