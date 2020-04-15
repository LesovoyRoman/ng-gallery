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

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  userFormTemplate: any = null;
  formFieldsArray: Array<any> = [];
  isLoading = true;
  users: Array<User> = [];
  $subscriptionUsers: any;
  $subscriptionUser: any;

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.$subscriptionUsers = this.subscribeUsers();
    this.addUserForm = this.buildForm();
  };

  buildEditForm = (user: User): void => {
    this.editUserForm = this.buildForm(user); // Edit user @todo add validation
    this.setCurrentForm(this.editUserForm);
  };

  setCurrentForm = (template: FormGroup = null): void => {
    if (template) {
      this.userFormTemplate = template;
      this.formFieldsArray = Object.keys(this.userFormTemplate['controls']);
    } else {
      this.userFormTemplate = null;
      this.formFieldsArray = [];
    }
  };

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

  buildForm = (user: User = undefined): FormGroup => {
    const objectToBuild =
      user
      ? this.helpers.objectSetValuesArrayFormGroup(this.helpers.buildForm(user), {}) // Update existed User
      : { // Simple form to create User
        name: [null, Validators.required],
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
      };

    return this.formBuilder.group(objectToBuild);
  };

  onFormSubmit() {
    if (!this.userFormTemplate.valid) {
      return; // @todo error goes
    }
    this.spinner.show();
    this.$subscriptionUser = this.api.updateUser(this.userFormTemplate.value, this.userFormTemplate === this.editUserForm)
      .subscribe((res: User) => {
        console.log(res, 'User response');
        this.$subscriptionUser.unsubscribe();
        this.helpers.loaded(this.spinner);
      }, (err: any) => {
        console.log(err, 'User error');
        this.$subscriptionUser.unsubscribe();
        this.helpers.loaded(this.spinner);
      });
  };

  ngOnDestroy(): void {
    this.$subscriptionUsers.unsubscribe();
  };
}
