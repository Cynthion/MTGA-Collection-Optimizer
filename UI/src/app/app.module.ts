import 'reflect-metadata';
import '../polyfills';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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

import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { PlatformServiceProvider } from './providers/platform-service-provider';
import { PreloadBridge } from './providers/preload.bridge';
import { BrowserStorageService } from './providers/browser-storage.service';

import { AppComponent } from './app.component';
import {
  reducers,
  metaReducers,
} from './app.reducer';
import {
  AboutDialogComponent,
  AboutDialogEffects,
} from './about';
import {
  ApiErrorComponent,
  ApiErrorEffects,
} from './api-error';
import {
  LayoutModule,
  LayoutEffects,
} from './layout';
import {
  SettingsDialogComponent,
  SettingsDialogEffects,
} from './settings';

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
  LayoutModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ...components,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AboutDialogEffects,
      ApiErrorEffects,
      LayoutEffects,
      SettingsDialogEffects,
    ]),
    ...matModules,
    ...featureModules,
  ],
  providers: [
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
