import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingStoreService } from '../../core/services';
import { Training } from '../../models';
import { Observable } from 'rxjs';
import { UserTrainingsGuard } from './user-trainings.guard';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {
  public trainings$: Observable<Training[]>;


  constructor(
    private trainingsStoreService: TrainingStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private trainingDetailsGuard: UserTrainingsGuard
  ) { }

  ngOnInit() {
    this.trainings$ = this.trainingsStoreService.getTrainingsByUserId(this.trainingDetailsGuard.userId);
  }

  public onCreateNewTraining() {
    this.router.navigate(['../create'], { relativeTo: this.route });
  }
}
