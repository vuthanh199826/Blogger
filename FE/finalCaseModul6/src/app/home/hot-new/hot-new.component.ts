import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post/service/post.service';
import {Post} from '../../model/post';

@Component({
  selector: 'app-hot-new',
  templateUrl: './hot-new.component.html',
  styleUrls: ['./hot-new.component.css']
})
export class HotNewComponent implements OnInit {

  constructor(private postService: PostService) { }
  top1Comment: Post[]=[];
  ngOnInit(): void {
    this.findTopComment()
  }

  findTopComment(){
    this.postService.findTopComment().subscribe(data=>{
      // @ts-ignore
      this.top1Comment = data
    })
  }


}
