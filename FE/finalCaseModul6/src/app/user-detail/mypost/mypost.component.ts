import { Component, OnInit } from '@angular/core';
import {PostService} from '../../post/service/post.service';
import {Post} from '../../model/post';
import {updatePlaceholderMap} from '@angular/compiler/src/render3/view/i18n/util';
import {HashtagService} from '../../admin/service/hashtag.service';


@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {
  page = 1;
  count = 0;
  tableSize = 10 ;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  myPost: Post[] = [];
  // @ts-ignore
  idUser: number;
  notification = 'Bạn có chắc muốn xóa';
  notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
  // @ts-ignore
  idPost: number;
  hasgtags: any;

  constructor(private postService: PostService,
              private hashtagService: HashtagService) {
    // @ts-ignore
    this.idUser = +sessionStorage.getItem('Id_key');
    this.getMyPost(this.idUser);
    this.hashtagService.getAll().subscribe(data => {
      this.hasgtags = data;
    });

  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  getMyPost(id: number) {
    this.postService.findAllByUserId(id).subscribe(data => {
      this.myPost = data;
    });
  }
  // tslint:disable-next-line:typedef
  deletePost(id: number) {
    this.postService.delete(id).subscribe(data => {
      console.log(data);
      this.getMyPost(this.idUser);
    });
  }
  // tslint:disable-next-line:typedef
  searchByTitle() {
    // @ts-ignore
    const title = document.getElementById('search').value.trim();
    if (title === '') {
      // @ts-ignore
      document.getElementById('search').style.borderColor = 'red';
    }else {
      this.postService.findMyPostByTitle(this.idUser, title).subscribe(data => {
        this.myPost = data;
      });
    }
  }
  // tslint:disable-next-line:typedef
  getIdPost(id: any) {
    this.idPost = id;
  }
  // tslint:disable-next-line:typedef
  tabSize(event: any) {
    this.page = event;
  }
  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  // tslint:disable-next-line:typedef
  changeBoderColor() {
    // @ts-ignore
    document.getElementById('search').style.borderColor = 'green';
  }
  // tslint:disable-next-line:typedef
  findMyPostByHashtag(userId: number, hashtagId: number) {
    this.postService.findMyPostByHashtag(userId, hashtagId).subscribe(data => {
      this.myPost = data;
    });
  }
}
