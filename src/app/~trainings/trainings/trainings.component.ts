import { Component, OnInit } from '@angular/core';
import { TrainingStoreService } from '../../core/services';
import { Training } from '../../models';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  constructor(public trainingsStoreService: TrainingStoreService) { }

  ngOnInit() {
  }

  public onClick(){
    this.trainingsStoreService.createTraining({} as Training);
  }
}
