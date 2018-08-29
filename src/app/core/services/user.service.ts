import { Injectable } from '@angular/core';
import { Training } from '../../models/training.model';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models';

@Injectable()
export class UserService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    public getUser(userId: string) {
        return this.http.get<User>(this.constructUrl(this.userModule, userId));
    }
}
