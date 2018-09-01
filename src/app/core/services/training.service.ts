import { Injectable } from '@angular/core';
import { Training } from '../../models/training.model';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TrainingService extends BaseService {
    private readonly trainingsEndpoint = 'Trainings';

    constructor(protected http: HttpClient) {
        super(http);
    }

    public createTraining(training: Training) {
        return this.http.post(this.constructUrl(this.appDataModule, this.trainingsEndpoint), JSON.stringify(training));
    }

    public getTrainingsByUserId(userId: string) {
        const query = { ownerId: userId };

        return this.http.get<Training[]>(this.constructUrl(this.appDataModule, this.trainingsEndpoint, JSON.stringify(query)));
    }

    public deleteTraining(training: Training) {
        return this.http.delete(this.constructUrl(this.appDataModule, this.trainingsEndpoint + '/' + training._id))
            .pipe( switchMap((count) => of(training)));
    }

    public editTraining(training: Training) {
        return this.http
        .put<Training>(this.constructUrl(this.appDataModule, this.trainingsEndpoint + '/' + training._id), JSON.stringify(training));
    }

    public getPublicTrainings() {
        const query = { isPublic: true };

        return this.http.get<Training[]>(this.constructUrl(this.appDataModule, this.trainingsEndpoint, JSON.stringify(query)));
    }
}
