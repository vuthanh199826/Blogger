import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../../../service/user-management.service';
import {ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../model/user';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  idAdmin = sessionStorage.getItem('Id_key')
  userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    roles: new FormControl(''),
    avatar: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    status: new FormControl(''),
    timeCreated: new FormControl('')
  })
  id = 0;
  closeResult = '';
  constructor(private modalService: NgbModal,private userService: UserManagementService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((data: ParamMap)=>{
      // @ts-ignore
      this.id = +data.get('id')
      this.getUser(this.id)
    })
  }
  getUser(id: number){
    return this.userService.findById(id).subscribe((data)=>{
      this.userForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        username: new FormControl(data.username),
        email: new FormControl(data.email),
        password: new FormControl(data.password),
        // @ts-ignore
        roles: new FormControl(data.roles[0].id),
        avatar: new FormControl(data.avatar),
        phone: new FormControl(data.phone),
        address: new FormControl(data.address),
        status: new FormControl(data.status),
        timeCreated: new FormControl(data.timeCreated)
    })
      console.log()
  })
  }
  update(id: number) {
    const user: any = {
      id: id,
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      roles: [
        {
          id: this.userForm.value.roles
        }
      ],
      avatar: this.userForm.value.avatar,
      phone: this.userForm.value.phone,
      address: this.userForm.value.address,
      status: this.userForm.value.status,
      timeCreated: this.userForm.value.timeCreated,
    }
    console.log(user)
    this.userService.update(id,user).subscribe(()=>{

    })
  }

  reload(){
    location.reload()
  }

  ngOnInit(): void {
    this.getUser(this.id)
    console.log(this.idAdmin)
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    } else {
      return '';
    }
  }

}
