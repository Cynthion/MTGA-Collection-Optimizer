import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { WindowRef } from './windowRef';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { rootReducers } from './app.reducer';

const matModules = [
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([]),
    ...matModules,
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
