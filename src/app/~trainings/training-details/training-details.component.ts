import { Component, OnInit, OnDestroy } from '@angular/core';
import { Training, User, Exercise } from '../../models';
import {
  TrainingStoreService,
  UserStoreService,
  AuthService,
  ExerciseStoreService
} from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StringType } from '../../shared/model';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit, OnDestroy {
  public inEdit = false;
  public canEdit = false;

  public user$: Observable<User>;
  public training: Training;

  private trainingId: string;
  private userId: string;

  public exercises$: Observable<Exercise[]>;

  private subscriptions: Subscription[] = [];

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
    private authService: AuthService,
    private exerciseStoreService: ExerciseStoreService) { }

  ngOnInit() {
    this.subscriptions.push(
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

    this.subscriptions.push(
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

    const exercisesSub = this.exerciseStoreService.getAreExercisesLoadedByTrainingId(this.trainingId)
      .subscribe(areloaded => {
        if (!areloaded) {
          this.exerciseStoreService.loadExercisesByTrainingId(this.trainingId);
        }
      });
    this.subscriptions.push(exercisesSub);

    this.exercises$ = this.exerciseStoreService.getExercisesLoadedByTrainingId(this.trainingId);
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

    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  public onAddTraining() {
    this.router.navigate(['exercises', this.trainingId, 'create']);
  }

  public onRemoveExercise(exercise: Exercise) {
    this.exerciseStoreService.deleteExercise(exercise);
  }

  public viewExercise(exerciseId: string) {
    this.router.navigate(['exercises', this.trainingId, exerciseId]);
  }

  get nameVal(): AbstractControl {
    return this.trainingForm.get('Name');
  }

  get instrictionsVal(): AbstractControl {
    return this.trainingForm.get('Instructions');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
