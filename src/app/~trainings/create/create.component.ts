import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StringType } from '../../shared/model';
import { Training } from '../../models/training.model';
import {
  AuthService,
  TrainingStoreService,
  UserService
} from '../../core/services';
import { Router } from '@angular/router';
import { User } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-training',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateTrainingComponent implements OnInit {
  private ownerId: string;
  private owner: User;

  private subscriptions: Subscription[] = [];

  public name = new FormControl(null, [Validators.required, Validators.maxLength(StringType.NormalText)]);
  public description = new FormControl(null, [Validators.maxLength(StringType.HugeText)]);
  public instructions = new FormControl(null, [Validators.required, Validators.maxLength(StringType.MaxText)]);
  public isPublic = new FormControl(false);

  public trainingForm: FormGroup = new FormGroup({
    Name: this.name,
    Description: this.description,
    Instructions: this.instructions,
    IsPublic: this.isPublic
  });


  constructor(
    private authService: AuthService,
    private trainingStoreService: TrainingStoreService,
    private router: Router,
    private userService: UserService) {
  }

  public ngOnInit() {
    this.ownerId = this.authService.getUserId();

    this.subscriptions
    .push(this.userService.getUser(this.ownerId)
      .subscribe(user => this.owner = user));
  }

  public createTraining() {
    const groupValue = this.trainingForm.value;

    const training: Training = {
      ownerId: this.ownerId,
      name: groupValue.Name,
      description: groupValue.Description,
      instructions: groupValue.Instructions,
      isPublic: groupValue.IsPublic,
      ownerName: this.owner.username
    };

    this.trainingStoreService.createTraining(training);

    this.router.navigate(['/trainings', this.ownerId]);
  }

  get nameVal(): AbstractControl {
    return this.trainingForm.get('Name');
  }

  get instrictionsVal(): AbstractControl {
    return this.trainingForm.get('Instructions');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
