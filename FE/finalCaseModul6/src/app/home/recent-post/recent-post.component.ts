import {Component, OnInit} from '@angular/core';
import {PostService} from '../../post/service/post.service';
import {Post} from '../../model/post';

@Component({selector: 'app-recent-post', templateUrl: './recent-post.component.html', styleUrls: ['./recent-post.component.css']})
export class RecentPostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  // tslint:disable-next-line:typedef
  getAll() {
    this.postService.findTopComment().subscribe(data => {
      console.log(data);      // @ts-ignore
      this.posts = data;
    }, error => {
      console.log(error);
    });
  }
}
