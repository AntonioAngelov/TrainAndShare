import { Injectable } from "@angular/core";
import { Training } from "../../models";
import { Observable, of } from "rxjs";
import 'rxjs/Rx'; 

@Injectable()
export class TrainingService {
    constructor( ) {
    }
    public createTraining(training: Training) {
        const newTrainig: Training = {_id: 'id', name: 'Name', description: 'description', ownerId: 'ownerid', instructions: 'instructions'} 

        return of(newTrainig);
    }
}