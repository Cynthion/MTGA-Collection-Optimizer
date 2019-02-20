import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxElectronModule } from 'ngx-electron';

import { PlatformServiceProvider } from './util/platform-service-provider';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AppGuard } from './app.guard';
import { rootReducers } from './app.reducer';
import {
  SettingsDialogComponent,
  SettingsDialogEffects,
} from './settings';

const matModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
];

const components = [
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
    FormsModule,
    StoreModule.forRoot(rootReducers),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([SettingsDialogEffects]),
    NgxElectronModule,
    ...matModules,
  ],
  providers: [AppGuard, PlatformServiceProvider],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialogComponent],
})
export class AppModule { }
