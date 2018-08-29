import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlMessageComponent } from './forms/form-control-message/form-control-message.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IsPublicLabelPipe } from './pipes/is-public-label.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FormControlMessageComponent, IsPublicLabelPipe],
  exports:
  [
    FormControlMessageComponent,
    ReactiveFormsModule,
    FormsModule,
    IsPublicLabelPipe
  ]
})
export class SharedModule { }
