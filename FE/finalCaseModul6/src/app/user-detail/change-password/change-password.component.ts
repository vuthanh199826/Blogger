import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../../authentication/service/token.service';
import {RegisterForm} from '../../authentication/model/register-form';
import {UserManagementService} from '../../admin/service/user-management.service';
import {ChangePasswordForm} from '../../admin/model/change-password-form';
import {LoginService} from '../../authentication/service/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup = this.formBuilder.group({
    username: [this.tokenService.getUserName()],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    status: ['', [Validators.required]],
    timeCreated: ['', [Validators.required]],
    roles: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6),]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmNewPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]],
    acceptTerms: [false, Validators.requiredTrue]
  },{
    validator: this.loginService.MustMatch('newPassword', 'confirmNewPassword')
  });
  submitted = false;
  status : any =''
  constructor(private formBuilder: FormBuilder,
              private userService: UserManagementService,
              private tokenService: TokenService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  get f() {
    return this.passwordForm.controls;
  }

  // isValidated(passwordForm: ChangePasswordForm) {
  //   // tslint:disable-next-line:triple-equals
  //   return passwordForm.password != ''
  //     && passwordForm.newPassword != ''
  //     && passwordForm.username != ''
  //     && passwordForm.phone != ''
  //     && passwordForm.address != ''
  //     && passwordForm.status != null
  //     && passwordForm.timeCreated != ''
  //     && passwordForm.roles != [];
  //
  // }

  getUser() {
    this.userService.findById(+this.tokenService.getId()).subscribe(data => {
      this.passwordForm = this.formBuilder.group({
        username: [data.username],
        phone: [data.phone],
        address: [data.address],
        status: [data.status],
        timeCreated: [data.timeCreated],
        roles: [data.roles[0].id],
        password: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]],
        confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue]
      },{validator: this.loginService.MustMatch('newPassword', 'confirmNewPassword')});
    });
  }


  onSubmit() {
    this.submitted = true;
    const changePasswordForm: any = {
      username: this.tokenService.getUserName(),
      password: this.passwordForm.value.password,
      newPassword: this.passwordForm.value.newPassword,
      phone: this.passwordForm.value.phone,
      address: this.passwordForm.value.address,
      status: this.passwordForm.value.status,
      timeCreated: this.passwordForm.value.timeCreated,
      roles: [
        {
          id: this.passwordForm.value.roles
        }
      ]
    };
    if (this.passwordForm.invalid){
      this.status = '<img src="https://cdn-icons-png.flaticon.com/128/179/179386.png" width="35" height="35"> Edit False '
      return ;
    }if (this.passwordForm.value.password == this.passwordForm.value.newPassword){
      this.status = '<img src="https://cdn-icons-png.flaticon.com/128/179/179386.png" width="35" height="35"> The new password must be different from the old password'
      return;
    }
      this.userService.changePassword(changePasswordForm).subscribe(data => {
        this.status = '<img src="https://cdn-icons-png.flaticon.com/128/845/845646.png" height="35" width="35"> Edit Success '
      },e=>{
        if (e.status == '401'){
          this.status = '<img src="https://cdn-icons-png.flaticon.com/128/564/564619.png" height="35" width="35"> Wrong password ';
        }
      });
    }
}

