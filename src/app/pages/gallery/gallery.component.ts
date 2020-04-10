import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  isLoading = true;
  images: Array<object> = [];

  constructor(private http: ApiService) { }

  ngOnInit(): void {
    this.http.getImages()
      .subscribe((images) => {
        this.isLoading = false;
        this.images = images;
      }, err => {
        console.log(err, 'images error');
        this.isLoading = false;
      });
  }
}
