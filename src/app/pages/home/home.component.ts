import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  users: Array<object> = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe((users: any) => {
        this.users = users;
        this.isLoading = false;
      }, err => {
        console.log(err, 'users error');
        this.isLoading = false;
      });
  }
}
