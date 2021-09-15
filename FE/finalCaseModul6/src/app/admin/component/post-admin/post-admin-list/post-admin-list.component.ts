import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../../post/service/post.service';
import {Post} from '../../../../model/post';
import {Hashtag} from '../../../model/hashtag';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {HashtagService} from '../../../service/hashtag.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-admin-list',
  templateUrl: './post-admin-list.component.html',
  styleUrls: ['./post-admin-list.component.css']
})
export class PostAdminListComponent implements OnInit {
  posts: Post[] = [];
  status: any = '';
  postForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    image: new FormControl(),
    status: new FormControl(''),
    description: new FormControl(),
    content: new FormControl('', [Validators.required]),
    date: new FormControl(),
    user: new FormControl(),
    hashtag: new FormControl()
  });

  page = 1;
  count = 0;
  tableSize = 6;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  hashtags: Hashtag[] = [];
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  keyword = 'title';

  data: Post[] = [];
  constructor(private postService: PostService, private hashtagService: HashtagService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  ngOnInit(): void {
    this.getAll();
    this.getAllHashtag();
  }


  findPostById(id: any) {
    this.postService.get(id).subscribe(data=>{
      this.postForm = new FormGroup({
        id: new FormControl(data.id),
        title: new FormControl(data.title, [Validators.required]),
        image: new FormControl(data.image),
        status: new FormControl(data.status),
        description: new FormControl(data.description),
        content: new FormControl(data.content, [Validators.required]),
        date: new FormControl(data.date),
        user: new FormControl(data.user.id),
        hashtag: new FormControl(data.hashtag.id)
      })
    })

  }
   updateStatus(){
    const post ={
      id: this.postForm.value.id,
      title: this.postForm.value.title ,
      image: this.postForm.value.image ,
      status: this.postForm.value.status ,
      description: this.postForm.value.description ,
      content: this.postForm.value.content ,
      date: this.postForm.value.date ,
      user: {
        id: this.postForm.value.user
      },
      hashtag: {
        id: this.postForm.value.hashtag
      }
    }
    this.postService.edit(post).subscribe(data =>{
      this.status = "Update Success ! <img src='https://cdn-icons-png.flaticon.com/128/845/845646.png' height='40' width='40'>"
      this.getAll()
    }, error => {
      this.status = "False !"
    })


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
    this.postService.getAllOfAdmin().subscribe(data => {
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

  getAllByStatus(){
    // @ts-ignore
    status = document.getElementById('selectStatus').value
    if (status == 'public'){
      this.postService.getAll().subscribe(data =>{
        this.posts = data
      })
    }if (status == 'lock'){
      this.postService.getAllPostLock().subscribe(data=>{
        this.posts = data
      })
    }if (status == ''){
      this.getAll()
    }
  }

  getAllHashtag() {
    this.hashtagService.getAll().subscribe(data => {
      // @ts-ignore
      this.hashtags = data;
    });
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
    if (dayEnd == ''){
      this.postService.findByDate(timeStart, timeStart1).subscribe(data => {
        // @ts-ignore
        this.posts = data;
      });
    }
    if (dayEnd == ''){
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

}
