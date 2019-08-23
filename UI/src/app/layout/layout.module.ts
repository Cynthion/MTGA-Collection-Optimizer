import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
  } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { layoutRoutes } from './layout.routing';
import { LayoutInitializationGuard } from './layout.guard';
import { LAYOUT_FEATURE_NAME } from './layout.state';
import { layoutReducer } from './layout.reducer';
import { LayoutComponent } from './layout.component';
import {
    InventoryComponent,
    InventoryEffects,
} from './inventory';
import { TabsComponent } from './tabs';

const matModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
  ];

const components = [
    LayoutComponent,
    InventoryComponent,
    TabsComponent,
  ];

  const effects = [
    InventoryEffects,
  ];

@NgModule({
    declarations: [
      ...components,
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(layoutRoutes),
      StoreModule.forFeature(LAYOUT_FEATURE_NAME, layoutReducer),
      EffectsModule.forFeature(effects),
      ...matModules,
    ],
    providers: [LayoutInitializationGuard],
  })
  export class LayoutModule { }
