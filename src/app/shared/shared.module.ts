import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IsPublicLabelPipe } from './pipes/is-public-label.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [IsPublicLabelPipe, SafePipe],
  exports:
  [
    ReactiveFormsModule,
    FormsModule,
    IsPublicLabelPipe,
    SafePipe
  ],
})
export class SharedModule { }
