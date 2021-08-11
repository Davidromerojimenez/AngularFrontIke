import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerViewComponent } from '../components/spinner-view/spinner-view.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UtilService {

    spinnerRef: boolean;

    constructor(private router: Router, private dialog: MatDialog) { this.spinnerRef = true }

    start(content: any): MatDialogRef<SpinnerViewComponent> {

        const dialogRef = this.dialog.open(SpinnerViewComponent, {
            disableClose: true,
            data: {
                spinner: content.spinner,
                title: content.title,
                message: content.message
            }
        });
        return dialogRef;
    };

    stop(ref: MatDialogRef<SpinnerViewComponent>) {
        ref.close();
    }

    openDialog(content: any): MatDialogRef<SpinnerViewComponent> {
        const alert_dialog = this.dialog.open(SpinnerViewComponent, {
            data: {
                status: content.status,
                spinner: content.spinner,
                title: content.title,
                message: content.message
            }
        });

        alert_dialog.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });

        return alert_dialog;
    }


}
