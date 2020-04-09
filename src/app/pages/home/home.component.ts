import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = true;
  users: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe((users: any) => {
        this.users = users;
        console.log(users)
        this.isLoading = false;
      }, err => {
        console.log(err, 'users error');
        this.isLoading = false;
      });
  }
}
