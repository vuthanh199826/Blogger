import { Component, OnInit } from '@angular/core';
import {HashtagService} from '../../../service/hashtag.service';
import {Hashtag} from '../../../model/hashtag';

@Component({
  selector: 'app-hashtag-list',
  templateUrl: './hashtag-list.component.html',
  styleUrls: ['./hashtag-list.component.css']
})
export class HashtagListComponent implements OnInit {
  hashtags: Hashtag[] =[];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  constructor(private hashtagService: HashtagService) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.hashtagService.getAll().subscribe(data =>{
      // @ts-ignore
      this.hashtags = data;
      console.log(this.hashtags)
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
