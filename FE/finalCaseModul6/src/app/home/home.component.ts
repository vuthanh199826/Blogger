import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = sessionStorage.getItem('Name_key')
  token = sessionStorage.getItem('Token_key')
  avatar = sessionStorage.getItem('Avatar_key')
  constructor() { }

  ngOnInit(): void {
  }

}
