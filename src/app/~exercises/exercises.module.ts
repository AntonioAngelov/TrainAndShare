import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { ExercisesBaseComponent } from './exercises-base/exercises-base.component';
import { ExerciseCreateComponent } from './exercise-create/exercise-create.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    ExerciseDetailsComponent,
    ExercisesBaseComponent,
    ExerciseCreateComponent
  ],
  exports: [
    ExerciseDetailsComponent
  ]
})
export class ExercisesModule { }
