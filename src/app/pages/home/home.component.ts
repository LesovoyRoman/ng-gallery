import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { User } from '../../objectTypes/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;
  isLoading = true;
  users: Array<User> = [];
  addUserFormTemplate = false;
  $subscriptionUsers: any;
  $subscriptionAddUser: any;

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.$subscriptionUsers = this.subscribeUsers();
    this.userForm = this.buildForm();
  }

  toggleUserForm = () => this.addUserFormTemplate = !this.addUserFormTemplate;

  subscribeUsers = () => this.api.getUsers()
    .subscribe((users: Array<User>) => {
      this.users = users;
      this.isLoading = false;
      this.helpers.loaded(this.spinner);
    }, (err: any) => {
      console.log(err, 'users error');
      this.isLoading = false;
      this.helpers.loaded(this.spinner);
    });

  buildForm = (): FormGroup => this.formBuilder.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
  });

  onFormSubmit() {
    if (!this.userForm.valid) {
      return; // @todo error goes
    }
    this.spinner.show();
    this.$subscriptionAddUser = this.api.addUser(this.userForm.value)
      .subscribe((res: User) => {
        console.log(res, 'User')
        this.$subscriptionAddUser.unsubscribe();
        this.helpers.loaded(this.spinner);
      }, (err: any) => {
        console.log(err, 'add user');
        this.$subscriptionAddUser.unsubscribe();
        this.helpers.loaded(this.spinner);
      });
  }

  ngOnDestroy(): void {
    this.$subscriptionUsers.unsubscribe();
  }
}
