import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/admin/model/user';
import {UserManagementService} from '../../admin/service/user-management.service';

@Component({
  selector: 'app-about-us-home',
  templateUrl: './about-us-home.component.html',
  styleUrls: ['./about-us-home.component.css']
})
export class AboutUsHomeComponent implements OnInit {
  users : User[]= []
  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    this.findTopUser()
  }

  findTopUser(){
    this.userService.findTopUserByPost().subscribe(data=>{
      // @ts-ignore
      this.users = data
    })
  }

}
