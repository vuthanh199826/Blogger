import { Component, OnInit } from '@angular/core';
import {HashtagService} from '../../admin/service/hashtag.service';
import {Hashtag} from '../../admin/model/hashtag';
import {PostService} from '../../post/service/post.service';
import {Post} from '../../model/post';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-slide-hashtag',
  templateUrl: './slide-hashtag.component.html',
  styleUrls: ['./slide-hashtag.component.css']
})
export class SlideHashtagComponent implements OnInit {
  hashtags: Hashtag[] = []
  posts: Post[] = []
  page = 1;
  count = 0;
  tableSize = 6 ;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  constructor(private hashtagService: HashtagService, private postService: PostService,private router: Router) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.hashtagService.getAll().subscribe((data)=>{
      // @ts-ignore
      this.hashtags = data;
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
  getPostByHashtag(id:any) {
    this.router.navigate(['post/list',id])
  }
}
