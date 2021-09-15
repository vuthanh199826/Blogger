import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../post/service/post.service';
import {Post} from '../../../model/post';
import {Hashtag} from '../../../admin/model/hashtag';
import {HashtagService} from '../../../admin/service/hashtag.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-hashtag-post',
  templateUrl: './hashtag-post.component.html',
  styleUrls: ['./hashtag-post.component.css']
})
export class HashtagPostComponent implements OnInit {
  posts: Post[] = [];
  page = 1;
  count = 0;
  tableSize =6 ;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  hashtags: Hashtag[] = []
  tag: Hashtag = {} ;
  id: any = 0
  constructor(private postService: PostService, private hashtagService: HashtagService,private activateRoute: ActivatedRoute ) {
    this.activateRoute.paramMap.subscribe((data: ParamMap)=>{
      // @ts-ignore
      this.id = +data.get('id')
      this.getPost(this.id)
      this.getAllHasshtag()
      this.findHashtagbyId(this.id)
    })
  }
  // getHashtag(id: any){
  //   this.hashtagService.findById(id).subscribe(data=>{
  //     this.tag = data;
  //   })
  // }
  reload(){

  }
  getPost(id: any){
    this.postService.findAllByHashtag(id).subscribe(data =>{
      // @ts-ignore
      this.posts = data
    })
  }
  getAllHasshtag(){
    this.hashtagService.getAll().subscribe(data=>{
      // @ts-ignore
      this.hashtags = data
    })
  }
  findByTitle(){
    // @ts-ignore
    const title = document.getElementById('keywords').value;
    this.postService.findByTitle(title).subscribe(data=>{
      this.posts = data
    })
  }
   findHashtagbyId(id: any){
    this.hashtagService.findById(id).subscribe(tag=>{
      this.tag = tag
      console.log(this.tag.image)
    })
   }
  ngOnInit(): void {
  }
  tabSize(event: any) {
    this.page = event;
    this.getPost(this.id);
  }
  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPost(this.id);
  }


}
