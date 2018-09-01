import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTrainingsComponent } from './user-trainings/user-trainings.component';
import { CreateTrainingComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { TrainingsBaseComponent } from './trainings-base/trainings-base.component';
import { RouterModule } from '@angular/router';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PublicTrainingsComponent } from './public-trainings/public-trainings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    RouterModule,
    NgxPaginationModule
  ],
  declarations: [
    UserTrainingsComponent,
    CreateTrainingComponent,
    TrainingsBaseComponent,
    PublicTrainingsComponent,
    TrainingDetailsComponent
  ],
  exports: [
    UserTrainingsComponent,
    CreateTrainingComponent,
    PublicTrainingsComponent,
    TrainingDetailsComponent
  ]
})
export class TrainingsModule { }
