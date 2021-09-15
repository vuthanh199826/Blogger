import { Component, OnInit } from '@angular/core';
import {Like} from "../../model/like";
import {LikeService} from "../../services/like.service";


@Component({
  selector: 'app-recent-view',
  templateUrl: './recent-view.component.html',
  styleUrls: ['./recent-view.component.css']
})
export class RecentViewComponent implements OnInit {
  likes : Like[] = [];

  page = 1;
  count = 0;
  tableSize = 4 ;
  constructor(private liveService: LikeService) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.liveService.findTopLike().subscribe(data=>{
      console.log(data);
      this.likes=data;
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
