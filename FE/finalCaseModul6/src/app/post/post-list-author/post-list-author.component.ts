import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post';
import {PostService} from '../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {HashtagService} from '../../admin/service/hashtag.service';

@Component({
  selector: 'app-post-list-author',
  templateUrl: './post-list-author.component.html',
  styleUrls: ['./post-list-author.component.css']
})
export class PostListAuthorComponent implements OnInit {
  hashtags: any;
  titles: string[] = [];
  posts: Post[] = [];
  // @ts-ignore
  id: number;
  page = 1;
  count = 0;
  tableSize = 10 ;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;

  constructor(private postService: PostService,
              private hashtagService: HashtagService,
              private router: Router,
              private acvivatedRouter: ActivatedRoute) {
    this.acvivatedRouter.paramMap.subscribe(data => {
      // @ts-ignore
      this.id = +data.get('id');
    });
    // @ts-ignore
    this.postService.findPostByAuthor(this.id).subscribe(data => {
      this.posts = data;
      for (const item of data){
        this.titles.push(item.title);
      }
    });
    this.hashtagService.getAll().subscribe(data => {
      this.hashtags = data;
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  getAll() {
    this.postService.findPostByAuthor(this.id).subscribe(data => {
      this.posts = data;
    });
  }
  // tslint:disable-next-line:typedef
  tabSize(event: any) {
    this.page = event;
  }
  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  formatter = (result: string) => result;
  // @ts-ignore
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.titles.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  // tslint:disable-next-line:typedef
  searchByTitle() {
    // @ts-ignore
    const title = document.getElementById('search').value.trim();
    this.postService.findPostAuthorByTitle(this.id, title).subscribe(data => {
      this.posts = data;
    });
  }
}
