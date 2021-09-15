import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {TokenService} from '../../service/token.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterForm} from '../../model/register-form';
import {error} from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  content: any;
  closeResult = '';
  submitted = false;
  addresses: any[] = [];
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  status: any = '<i class="fa fa-keyboard"></i>  Please login your account';
  statusRegister: any = '';

  registerForm: FormGroup = this.fb.group({
    username: ['',Validators.required,Validators.minLength(6)],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  },{
    validator: this.loginService.MustMatch('password', 'confirmPassword')
  });


  constructor(
              private loginService: LoginService,
              private tokenService: TokenService,
              private router: Router,
              private modalService: NgbModal,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAddress();
  }

  // tslint:disable-next-line:typedef
  get f() {return this.registerForm.controls; }

  // tslint:disable-next-line:typedef
  getAddress(){
    this.loginService.getAddress().subscribe(data => {
      this.addresses = data;
      console.log(data[0].name);
    });
  }

  // tslint:disable-next-line:typedef
  open(content: any)
  {
    this.modalService.open(content , {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return '';
    }
  }


  // tslint:disable-next-line:typedef
  login(){
    const loginForm = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.loginService.login(loginForm).subscribe(data => {
      if (data.token){
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setUserName(data.username);
        this.tokenService.setId(data.id);
        this.tokenService.setAvartar(data.avatar);
        this.tokenService.setRoles(data.roles);
        console.log(this.tokenService.setRoles(data.roles));
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.tokenService.getRoles().length; i++) {
          console.log(this.tokenService.getRoles()[i]);
          // tslint:disable-next-line:triple-equals
          if (this.tokenService.getRoles()[i] == 'ADMIN'){
            // tslint:disable-next-line:only-arrow-functions typedef
           this.router.navigate(['/admin']).then(function(){
             location.reload();
           });
          }
          // tslint:disable-next-line:triple-equals
          if (this.tokenService.getRoles()[i] == 'USER'){
            location.reload();
          }
        }
      }
    }, err => {
      console.log(err.status);
      console.log(err);
      console.log(err.statusText);
      // tslint:disable-next-line:triple-equals
      if (err.status == '401' || err.status == '400') {
        console.log('Sai tk');
        this.status = ' <img src="../assets/images/wrong' +
          '.gif" width="30" height="30"> Please check your account or password';
        this.loginForm.reset();
      }
      // tslint:disable-next-line:triple-equals
      if (err.status == '423') {
        // @ts-ignore
        this.status = `<img src="../assets/images/lock.gif" width="30" height="30"> Your account has been locked`;
        this.loginForm.reset();
      }
    });
  }
  // tslint:disable-next-line:typedef
  isValidated(register: RegisterForm ){
    // tslint:disable-next-line:triple-equals
    return register.name != '' && register.username != '' && register.email != '' && register.password != '' && register.roles != [];
  }
  // tslint:disable-next-line:typedef
  register() {
    this.submitted = true;
    const registerForm: any = {
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      roles: ['user']
    };
    if (this.registerForm.invalid){
      this.statusRegister = '<span class="alert alert-danger"> Registration failed</span>'
      return ;
    }if (this.registerForm.value.password != this.registerForm.value.confirmPassword){
      this.statusRegister = '<span class="alert alert-danger"> Registration failed</span>'
      return ;
    }
    if (this.isValidated(registerForm)) {
      this.loginService.register(registerForm).subscribe(
        (data) => {
          // tslint:disable-next-line:triple-equals
          if (data.message == 'nouser'){
            this.statusRegister = '<span  class="alert alert-danger"><img src="../../../../assets/images/sad1.gif" height="30" width="30"> Your Username is duplicate !</span>';
            // tslint:disable-next-line:align triple-equals
          }if (data.message == 'noemail'){
            this.statusRegister = '<span  class="alert alert-danger"><img src="../../../../assets/images/sad1.gif" height="30" width="30"> Your Email is duplicate !</span>';
            // tslint:disable-next-line:align triple-equals
          }if (data.message == 'yes'){
            this.statusRegister = '<span  class="alert alert-success"><img src="../../../../assets/images/success.gif" width="30" height="35"> Success </span> ';
          }
        }, err => {
          console.log(err);
        }
      );
    }
  }
}
