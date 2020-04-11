import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  loaded(spinner: NgxSpinnerService): void {
    spinner.hide();
  }
}
