import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';
import { SettingsDialogState, SettingsStorageKey } from './settings.state';
import { ApplySettingsDialogAction } from './settings.actions';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsDialogState>;
  outputLogPath: string;
  logPollInterval: number;

  private storageService: StorageService;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private platformServiceProvicer: PlatformServiceProvider,
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.state$ = this.store.select(s =>  {
        return s.app.settingsDialog;
      });

      this.storageService = this.platformServiceProvicer.getStorageService();

      // TODO load previous settings
      // TODO fix settings validation
  }

  closeDialog(): void {
    if (!this.areSettingsValid()) {
      return;
    }

    console.log('Configured outputLogPath:', this.outputLogPath);
    console.log('Configured logPollInterval:', this.logPollInterval);

    const newSettingsDialogState: SettingsDialogState = {
      outputLogPath: this.outputLogPath,
      logPollInterval: this.logPollInterval,
    };

    this.storageService.store(SettingsStorageKey, newSettingsDialogState);

    this.actionsSubject.next(new ApplySettingsDialogAction(newSettingsDialogState));

    this.dialogRef.close();
  }

  areSettingsValid(): boolean {
    return this.isOutputLogPathValid();
  }

  isOutputLogPathValid(): boolean {
    return !!this.outputLogPath;
  }
}
