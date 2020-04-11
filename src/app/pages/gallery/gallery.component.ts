import { Component, OnInit } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isLoading = true;
  images: Array<object> = [];
  scroll$: Observable<any>;
  defaultImage$: string = 'assets/images/loading.gif';

  constructor(private http: ApiService, private spinner: NgxSpinnerService) {
    this.scroll$ = merge(
      fromEvent(window, 'scroll'),
    );
  }

  loaded(): void {
    this.spinner.hide();
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.http.getImages()
      .subscribe((images) => {
        this.loaded();
        this.images = images;
      }, err => {
        console.log(err, 'images error');
        this.loaded();
      });
  }
}
