import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../reducers/user.reducer';
import { User } from '../../../models';

export const getTrainingsState = createFeatureSelector<UsersState>('users');

export const getUsersById = createSelector(
    getTrainingsState,
    (state) => state.usersById
);

export const getIsUserLoaded = createSelector(
    getUsersById,
    (users) => (userId: string) => !!users[userId]);

export const getUser = createSelector(
    getUsersById,
    (users) => (userId: string) => users[userId]);
