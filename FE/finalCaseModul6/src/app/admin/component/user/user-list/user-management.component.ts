import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../../../service/user-management.service';
import {User} from '../../../model/user';
import {Post} from '../../../../model/post';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  roleName: any = '';
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  keyword = 'username';

  data: User[] = [];
  constructor(private userService: UserManagementService) { }
  selectEvent(item: any) {
    // do something with selected item
    console.log(item.title)
    this.userService.searchByUserName(item.username).subscribe(data=>{
      // @ts-ignore
      this.users = data
    })
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // do something when input is focused
  }
  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.userService.getAll().subscribe(users => {
      // @ts-ignore
      this.users = users;
      // @ts-ignore
      this.data = users
      // @ts-ignore
      console.log(this.roleName)
    } )
  }
  findByUsername(){
    // @ts-ignore
    const key = document.getElementById('key').value
    this.userService.searchByUserName(key).subscribe(data =>{
      // @ts-ignore
      this.users = data;
    })
  }

  tabSize(event: any) {
    this.page = event;
    this.getAll();
  }

  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAll();
  }

}
