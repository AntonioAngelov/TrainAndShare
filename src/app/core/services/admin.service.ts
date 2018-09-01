import { Injectable } from '@angular/core';
import { Exercise, User } from '../../models';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AdminService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getActiveUsers() {
        const query = { isLocked: false };

        return this.http.get<User[]>(this.constructUrl(this.userModule, '', JSON.stringify(query)));
    }

    public getLockedUsers() {
        const query = { isLocked: true };

        return this.http.get<User[]>(this.constructUrl(this.userModule, '', JSON.stringify(query)));
    }

    public lockUser(userId: string) {
        const userData = {
            userId: userId,
            setLockdownStateTo: true
        };

        const lockUserUrl = this.constructUrl('rpc', 'lockdown-user');

        return this.http.post(lockUserUrl, JSON.stringify(userData));
    }

    public unLockUser(userId: string) {
        const userData = {
            userId: userId,
            setLockdownStateTo: false
        };

        const lockUserUrl = this.constructUrl('rpc', 'lockdown-user');

        return this.http.post(lockUserUrl, JSON.stringify(userData));
    }

    public setLockedStatus(user: User) {
        return this.http
            .put<User>(this.constructUrl(this.userModule, user._id), JSON.stringify(user));
    }

    public makeAdmin(user: User) {
        return this.http
            .put<User>(this.constructUrl(this.userModule, user._id), JSON.stringify(user));
    }
}
