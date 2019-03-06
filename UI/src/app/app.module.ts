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
import { ApiErrorComponent } from './api-error';
import {
  SettingsDialogComponent,
  SettingsDialogEffects,
} from './settings';
import { AppEffects } from './app.effects';

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
];

const components = [
  ApiErrorComponent,
  SettingsDialogComponent,
];

// // NG Translate
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// // AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

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
      AppEffects,
      SettingsDialogEffects,
    ]),
    ...matModules,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (HttpLoaderFactory),
    //     deps: [HttpClient]
    //   }
    // })
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
    ApiErrorComponent,
    SettingsDialogComponent,
  ],
})
export class AppModule { }
