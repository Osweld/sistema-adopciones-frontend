import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../Servicios/shared.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit, OnDestroy {

  color?: string = 'yellow';
  title?: string;
  description?: string;
  isVisible?: boolean;
  unSubscribed: Subject<any>;

  constructor( private _sharedService: SharedService){
    this.unSubscribed = new Subject<null>();
    this._sharedService.snackbar$
    .pipe(
      takeUntil(this.unSubscribed)
    ).subscribe( (data: any) => {
      this.color = data?.color;
      this.title = data?.title;
      this.description = data?.description;
      this.isVisible = data?.isVisible;
    });
  }

  hideSnackbar() {
    this.isVisible = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unSubscribed.next(null);
    this.unSubscribed.complete();
  }
}
