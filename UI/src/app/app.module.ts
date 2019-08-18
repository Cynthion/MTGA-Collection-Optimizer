import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ElectronService } from './providers/electron.service';
import { PlatformServiceProvider } from './providers/platform-service-provider';
import { PreloadBridge } from './providers/preload.bridge';
import { BrowserStorageService } from './providers/browser-storage.service';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AppGuard } from './app.guard';
import { rootReducers } from './app.reducer';
import {
  AboutDialogComponent,
  AboutDialogEffects,
} from './about';
import {
  ApiErrorComponent,
  ApiErrorEffects,
} from './api-error';
import {
  SettingsDialogComponent,
  SettingsDialogEffects,
} from './settings';
import { MissingCardsModule } from './missing-cards/missing-cards.module';

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
];

const components = [
  AboutDialogComponent,
  ApiErrorComponent,
  SettingsDialogComponent,
];

const featureModules = [
  MissingCardsModule,
];

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
    EffectsModule.forRoot([
      AboutDialogEffects,
      ApiErrorEffects,
      SettingsDialogEffects,
    ]),
    ...matModules,
    ...featureModules,
  ],
  providers: [
    AppGuard,
    ElectronService,
    PlatformServiceProvider,
    PreloadBridge,
    BrowserStorageService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutDialogComponent,
    ApiErrorComponent,
    SettingsDialogComponent,
  ],
})
export class AppModule { }
