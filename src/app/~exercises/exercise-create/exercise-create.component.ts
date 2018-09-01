import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { StringType } from '../../shared/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, Training } from '../../models';
import { ExerciseStoreService, AuthService, TrainingStoreService } from '../../core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent implements OnInit, OnDestroy {
  public trainingId: string;
  public training: Training;
  public userId: string;

  private subscribtions: Subscription[] = [];

  public name = new FormControl(null, [Validators.required, Validators.maxLength(StringType.NormalText)]);
  public description = new FormControl(null, [Validators.maxLength(StringType.HugeText)]);
  public instructions = new FormControl(null, [Validators.required, Validators.maxLength(StringType.MaxText)]);
  public sets = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]);
  public reps = new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]);
  public videoUrl = new FormControl(null);

  public exerciseForm: FormGroup = new FormGroup({
    Name: this.name,
    Description: this.description,
    Instructions: this.instructions,
    Sets: this.sets,
    Reps: this.reps,
    VideoUrl: this.videoUrl
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exericseStoreService: ExerciseStoreService,
    private authService: AuthService,
    private trainingStoreService: TrainingStoreService) { }

  ngOnInit() {
    this.subscribtions
      .push(this.route.params
        .subscribe(params => this.trainingId = params['trainingId']));

    this.userId = this.authService.getUserId();

    this.subscribtions.push(
      this.trainingStoreService.getTrainingById(this.userId, this.trainingId)
        .subscribe(training => this.training = training));
  }

  public createExercise() {
    const groupValue = this.exerciseForm.value;

    const exercise: Exercise = {
      trainingId: this.trainingId,
      name: groupValue.Name,
      description: groupValue.Description,
      instructions: groupValue.Instructions,
      reps: groupValue.Reps,
      sets: groupValue.Sets,
      videoUrl: groupValue.VideoUrl
    };

    this.exericseStoreService.createExercise(exercise);

    this.router.navigate(['/trainings', this.userId, 'details', this.trainingId]);
  }

  get nameVal(): AbstractControl {
    return this.exerciseForm.get('Name');
  }

  get instructionsVal(): AbstractControl {
    return this.exerciseForm.get('Instructions');
  }

  get setsVal(): AbstractControl {
    return this.exerciseForm.get('Sets');
  }

  get repsVal(): AbstractControl {
    return this.exerciseForm.get('Reps');
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }
}
