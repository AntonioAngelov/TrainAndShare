import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TrainingStoreService,
  TrainingService
} from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CORE_MODULE_EFFECTS} from './effects';
import { reducers } from './state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(CORE_MODULE_EFFECTS),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [],
  providers: [
    TrainingStoreService,
    TrainingService
  ]
})
export class CoreModule { }
