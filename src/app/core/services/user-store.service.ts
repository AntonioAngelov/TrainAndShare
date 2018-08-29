import { Injectable } from '@angular/core';
import * as fromRoot from '../state';
import { Store } from '@ngrx/store';
import { User } from '../../models';
import * as UserActions from '../actions/user.actions';
import * as userSelectors from '../state/selectors/user.selectors';

@Injectable()
export class UserStoreService {
    constructor(private store: Store<fromRoot.AppState>) { }

    getIsUserLoaded(userId: string) {
        return this.store.select((state) => userSelectors.getIsUserLoaded(state)(userId));
    }

    getUser(userId: string) {
        return this.store.select((state) => userSelectors.getUser(state)(userId));
    }

    public loadUser(userId: string) {
        this.store.dispatch(new UserActions.LoadUserAction(userId));
    }
}
