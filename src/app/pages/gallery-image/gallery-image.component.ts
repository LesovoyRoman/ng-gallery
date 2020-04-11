import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiImage } from '../../objectTypes/ApiImage';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss']
})
export class GalleryImageComponent implements OnInit {

  isLoading = true;
  $subscription: any;
  image: ApiImage;

  constructor(
    private http: ApiService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.$subscription = this.http.getImage(this.route.snapshot.params.id)
      .subscribe((image: ApiImage) => {
        this.isLoading = false;
        this.image = image;
        this.helpers.loaded(this.spinner);
      }, (err: any) => {
        console.log(err, 'image error');
        this.isLoading = false;
        this.helpers.loaded(this.spinner);
      });
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }
}
