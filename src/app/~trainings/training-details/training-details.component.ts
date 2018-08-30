import { Component, OnInit } from '@angular/core';
import { Training, User } from '../../models';
import {
  TrainingStoreService,
  UserStoreService,
  AuthService
} from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StringType } from '../../shared/model';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  public inEdit = false;
  public canEdit = false;

  public user$: Observable<User>;
  public training: Training;

  private trainingId: string;
  private userId: string;

  private subscribtions: Subscription[] = [];

  public name = new FormControl(null, [Validators.required, Validators.maxLength(StringType.NormalText)]);
  public description = new FormControl(null, [Validators.maxLength(StringType.HugeText)]);
  public instructions = new FormControl(null, [Validators.required, Validators.maxLength(StringType.MaxText)]);
  public isPublic = new FormControl(false, [Validators.required]);

  public trainingForm: FormGroup = new FormGroup({
    Name: this.name,
    Description: this.description,
    Instructions: this.instructions,
    IsPublic: this.isPublic
  });

  constructor(
    private trainingsStoreService: TrainingStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private userStoreService: UserStoreService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscribtions.push(
      this.route.params
        .subscribe(params => {
          this.trainingId = params['trainingId'];
          this.userId = params['userId'];

          this.canEdit = this.authService.getUserId() === this.userId;

          const trainingSub = this.trainingsStoreService.getIsTrainingLoaded(this.userId, this.trainingId)
            .subscribe(isLoaded => {
              if (!isLoaded) {
                this.trainingsStoreService.loadTrainingsByUserId(this.userId);
              }

              if (!!trainingSub) {
                trainingSub.unsubscribe();
              }
            });
        })
    );

    this.subscribtions.push(
      this.trainingsStoreService.getTrainingById(this.userId, this.trainingId)
        .pipe(filter(training => !!training))
        .subscribe(training => {
          this.training = training;

          this.name.setValue(this.training.name);
          this.description.setValue(this.training.description);
          this.instructions.setValue(this.training.instructions);
          this.isPublic.setValue(this.training.isPublic);
        }));

    this.user$ = this.userStoreService.getUser(this.userId);
  }

  public onChangeEdit() {
    this.inEdit = !this.inEdit;
  }

  public editTraining() {
    const groupValue = this.trainingForm.value;

    this.training.name = groupValue.Name;
    this.training.description = groupValue.Description;
    this.training.instructions = groupValue.Instructions;
    this.training.isPublic = groupValue.IsPublic;

    this.trainingsStoreService.editTraining(this.training);

    this.inEdit = false;
  }

  public onDelete() {
    this.trainingsStoreService.deleteTraining(this.training);

    this.router.navigate(['../../'], { relativeTo: this.route});
  }

}
