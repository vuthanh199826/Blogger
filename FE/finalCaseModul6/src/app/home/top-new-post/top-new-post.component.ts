import { Component, OnInit } from '@angular/core';
import {PostService} from "../../post/service/post.service";
import {Post} from "../../model/post";

@Component({
  selector: 'app-top-new-post',
  templateUrl: './top-new-post.component.html',
  styleUrls: ['./top-new-post.component.css']
})
export class TopNewPostComponent implements OnInit {
  posts : Post[] = [];
  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    this.findTop()
  }
  findTop(){
    this.PostService.findTop().subscribe(data=>{
      console.log(data)
      this.posts = data
    })
  }
}
