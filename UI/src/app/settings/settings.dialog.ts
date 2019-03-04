import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../app.state';
import { SettingsDialogState } from './settings.state';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings.dialog.html',
  styleUrls: ['./settings.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDialogComponent {
  state$: Observable<SettingsDialogState>;

  private storageService: StorageService;
  private outputLogPathStorageKey = 'outputLogPath';
  private outputLogPath: string;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    private platformServiceProvicer: PlatformServiceProvider,
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.state$ = store.select(s =>  {
        return s.app.settingsDialog;
      });

      this.storageService = this.platformServiceProvicer.getStorageService();
  }

  closeDialog(): void {
    console.log('Configured path:', this.outputLogPath);

    this.storageService.save(this.outputLogPathStorageKey, this.outputLogPath);

    // TODO provide settings to backend

    this.dialogRef.close();
  }
}
