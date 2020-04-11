import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from '../../services/helpers/helpers.service';
import { User } from '../../objectTypes/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  users: Array<User> = [];

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getUsers()
      .subscribe((users: Array<User>) => {
        this.users = users;
        this.isLoading = false;
        this.helpers.loaded(this.spinner);
      }, (err: any) => {
        console.log(err, 'users error');
        this.isLoading = false;
        this.helpers.loaded(this.spinner);
      });
  }
}
