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

  objectSetValuesArrayFormGroup(object: object, validations: object = {}) {
    const objectArrayValues = {};
    for (const option in object) {
      objectArrayValues[option] = [object[option], validations[option]];
    }
    return objectArrayValues;
  }

  buildForm(objectToBuild: object = {}, options: object = {}) {
    const optionsIteration = options;
    for (const option in objectToBuild) {
      if (typeof objectToBuild[option] === 'object') {
        return this.buildForm(objectToBuild[option], optionsIteration);
      } else {
        optionsIteration[option] = objectToBuild[option];
      }
    }
    return optionsIteration;
  }
}
