import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {Post} from '../../model/post';
import {HashtagService} from '../../admin/service/hashtag.service';
import {Hashtag} from '../../admin/model/hashtag';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {LikeService} from '../../services/like.service';
import {UserManagementService} from '../../admin/service/user-management.service';
import {User} from '../../admin/model/user';
import {Like} from 'src/app/model/like';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  keyword = 'title';
  topLikePost: Like[] = [];
  topHashtag: Hashtag[] = [];
  postTopComment: Post[] = [];
  id = 0;
  like = 0;
  topUser: User[] = [];
  posts: Post[] = [];
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  hashtags: Hashtag[] = [];
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  data: Post[] = [];
  toDate: NgbDate | null;

  constructor(private postService: PostService,
              private hashtagService: HashtagService,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter,
              private userService: UserManagementService,
              private likeservice: LikeService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllHashtag();
    this.getTopUser();
    this.getTopPost();
    this.getTopHashtag();
    this.getTopComment();
  }

  selectEvent(item: any) {
    // do something with selected item
    console.log(item.title);
    this.postService.findByTitle(item.title).subscribe(data => {
      this.posts = data;
    });
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }

  // tslint:disable-next-line:typedef
  getAll() {
    // @ts-ignore
    this.postService.getAll().subscribe(data => {
      console.log(data);
      this.posts = data;
      this.data = data;
    });
  }

  reset() {
    this.getAll();
  }

  getAllByHashtag() {
    // @ts-ignore
    const id = document.getElementById('selectHashtag').value;
    if (id == '') {
      return this.getAll();
    }
    this.postService.findAllByHashtag(id).subscribe(data => {
      // @ts-ignore
      this.posts = data;
    });
  }

  findTagById(id: any){
    this.postService.findAllByHashtag(id).subscribe(data=>{
      // @ts-ignore
      this.posts = data
    })
  }

  getTopUser() {
    this.userService.findTopUserByPost().subscribe(data => {
      // @ts-ignore
      this.topUser = data;
    });
  }

  getTopPost() {
    this.likeservice.findTop5Like().subscribe(data => {
      // @ts-ignore
      this.topLikePost = data;
      console.log(data);
    });
  }

  getTopHashtag() {
    this.hashtagService.getTop().subscribe(data => {
      // @ts-ignore
      this.topHashtag = data;
    });
  }

  getTopComment() {
    this.postService.findTopComment().subscribe(data => {
      // @ts-ignore
      this.postTopComment = data;
    });
  }

  getAllHashtag() {
    this.hashtagService.getAll().subscribe(data => {
      // @ts-ignore
      this.hashtags = data;
    });
  }

  addBookmark(id: any){
    sessionStorage.setItem('bookmark',id);
  }

  getBookmark(){
    // @ts-ignore
    const id = +sessionStorage.getItem('bookmark')
    this.postService.get(id).subscribe(data=>{
      this.posts = [data]
    })
  }

  // tslint:disable-next-line:typedef
  findByTitle() {
    // @ts-ignore
    const title = document.getElementById('search').value;
    this.postService.findByTitle(title).subscribe(data => {
      console.log(data);
      // tslint:disable-next-line:no-conditional-assignment
      if (data.length === 0) {
        alert('ko thấy');
      } else {
        this.posts = data;
      }
    });
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

  infoPost(id: any) {
    this.postService.get(id).subscribe(data => {
    });
  }

  finByTime() {
    const hourStart = ' 00:00:00';
    const hourEnd = ' 23:59:59';
    // @ts-ignore
    const dayStart = document.getElementById('time1').value;
    // @ts-ignore
    const dayEnd = document.getElementById('time2').value;
    const timeStart = dayStart + hourStart;
    const timeStart1 = dayStart + hourEnd;
    const timeStartDefault = '2020-01-01' + hourStart;
    const timeEnd = dayEnd + hourEnd;
    if (dayStart == '' && dayEnd == '') {
      location.reload();
    }
    if (dayEnd == '') {
      this.postService.findByDate(timeStart, timeStart1).subscribe(data => {
        // @ts-ignore
        this.posts = data;
      });
    }
    if (dayEnd == '') {
      this.postService.findByDate(timeStartDefault, timeEnd).subscribe(data => {
        // @ts-ignore
        this.posts = data;
      });
    }
    this.postService.findByDate(timeStart, timeEnd).subscribe(data => {
      // @ts-ignore
      this.posts = data;
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  getlikesByIdpost(id: any): any{
   let a = 0
    this.likeservice.findLikeByIdPost(id).subscribe(data=>{
      console.log(data)
     a = + data.length;
    });
    console.log(a)
    return a
  }

}
