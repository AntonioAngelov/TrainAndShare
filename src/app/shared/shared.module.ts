import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlMessageComponent } from './forms/form-control-message/form-control-message.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FormControlMessageComponent],
  exports: 
  [
    FormControlMessageComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
