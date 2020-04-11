import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from '../../services/helpers/helpers.service';
import { ApiImage } from '../../objectTypes/ApiImage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isLoading = true;
  images: Array<ApiImage> = [];
  scroll$: Observable<any>;
  defaultImage$: string = 'assets/images/loading.gif';

  constructor(
    private http: ApiService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService) {
    this.scroll$ = merge(
      fromEvent(window, 'scroll'),
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.http.getImages()
      .subscribe((images: Array<ApiImage>) => {
        this.helpers.loaded(this.spinner);
        this.isLoading = false;
        this.images = images;
      }, (err: any) => {
        console.log(err, 'images error');
        this.isLoading = false;
        this.helpers.loaded(this.spinner);
      });
  }
}
