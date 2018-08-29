import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrainingsComponent } from './user-trainings/user-trainings.component';
import { CreateTrainingComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    UserTrainingsComponent,
    CreateTrainingComponent
  ],
  exports: [
    UserTrainingsComponent,
    CreateTrainingComponent
  ]
})
export class TrainingsModule { }
