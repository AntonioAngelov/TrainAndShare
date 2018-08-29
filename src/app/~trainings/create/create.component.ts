import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StringType } from '../../shared/model';
import { Training } from '../../models/training.model';
import {
  AuthService,
  TrainingStoreService
} from '../../core/services';

@Component({
  selector: 'app-create-training',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateTrainingComponent implements OnInit {
  private ownerId: string;

  public name = new FormControl(null, [Validators.required, Validators.maxLength(StringType.SmallText)]);
  public description = new FormControl(null, [Validators.maxLength(StringType.HugeText)]);
  public instructions = new FormControl(null, [Validators.required, Validators.maxLength(StringType.MaxText)]);
  public videoUrl = new FormControl(null, []);
  public isPublic = new FormControl(false, [Validators.required]);

  public trainingForm: FormGroup = new FormGroup({
    Name: this.name,
    Description: this.description,
    Instructions: this.instructions,
    VideoUrl: this.videoUrl,
    IsPublic: this.isPublic
  });


  constructor(
    private authService: AuthService,
    private trainingStoreService: TrainingStoreService) {
  }

  public ngOnInit() {
    this.ownerId = this.authService.getUserId();
  }

  public createTraining() {
    const groupValue = this.trainingForm.value;

    const training: Training = {
      ownerId: this.ownerId,
      name: groupValue.Name,
      description: groupValue.Description,
      instructions: groupValue.Instructions,
      videoUrl: groupValue.VideoUrl,
      isPublic: groupValue.IsPublic
    };

    this.trainingStoreService.createTraining(training);
  }

}
