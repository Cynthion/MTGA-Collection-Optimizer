import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WindowRef } from './windowRef';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AppGuard } from './app.guard';
import { rootReducers } from './app.reducer';
import { 
  SettingsComponent,
  SettingsDialogComponent,
  SettingsDialogEffects,
} from './settings';

const matModules = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
];

const components = [
  SettingsComponent,
  SettingsDialogComponent,
]

@NgModule({
  declarations: [
    AppComponent,
    ...components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([SettingsDialogEffects]),
    ...matModules,
  ],
  providers: [AppGuard, WindowRef],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialogComponent],
})
export class AppModule { }
