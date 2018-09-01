import { Injectable } from '@angular/core';
import { Exercise } from '../../models';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ExerciseService extends BaseService {
    private readonly exercisesEndpoint = 'Exercises';

    constructor(protected http: HttpClient) {
        super(http);
    }

    public createTraining(exercise: Exercise) {
        return this.http.post<Exercise>(this.constructUrl(this.appDataModule, this.exercisesEndpoint), JSON.stringify(exercise));
    }

    public getExercisesByTrainingId(trainingId: string) {
        const query = { trainingId: trainingId };

        return this.http.get<Exercise[]>(this.constructUrl(this.appDataModule, this.exercisesEndpoint, JSON.stringify(query)));
    }

    public deleteExercise(exercise: Exercise) {
        return this.http.delete(this.constructUrl(this.appDataModule, this.exercisesEndpoint + '/' + exercise._id))
            .pipe( switchMap((count) => of(exercise)));
    }
}
