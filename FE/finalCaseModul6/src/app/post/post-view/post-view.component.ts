import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../model/post';
import {LikeService} from '../../services/like.service';
import {Like} from '../../model/like';
import {CommmentpostService} from '../../services/commmentpost.service';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  img = '';
  message = '';
  email = new FormGroup({
    detail: new FormControl('', [Validators.required, Validators.email])
  });
  postInstand: Post = {
    user: {},
    hashtag: {}
  };
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizesArr = [4, 8, 12];
  currentIndex = 1;
  post: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    image: new FormControl(),
    status: new FormControl(),
    description: new FormControl(),
    content: new FormControl(),
    date: new FormControl(),
    user: new FormControl()
  });
  // @ts-ignore
  id: number;
  // @ts-ignore
  idUser = +sessionStorage.getItem('Id_key');
  comment: any;
  status: any = '';
  listComment: any;

  commentpost: FormGroup = new FormGroup({
    messages: new FormControl()
  });

  commentNew: FormGroup = new FormGroup({
    id: new FormControl(''),
    text: new FormControl(''),
    user: new FormControl(''),
    post: new FormControl('')
  });


  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private likeService: LikeService,
              private commentService: CommmentpostService) {
    this.activatedRoute.paramMap.subscribe(data => {
      // @ts-ignore
      this.id = +data.get('id');
      this.getById(this.id);
    });
  }

  // @ts-ignore
  comments: IComment = {
    text: '',
    id: ''
  };

  ngOnInit(): void {
    this.getCommentList();
    this.checkLike();
  }

  // tslint:disable-next-line:typedef
  checkLike() {
    this.likeService.checkLike(this.idUser, this.id).subscribe(data => {
      // @ts-ignore
      document.getElementById('like-icon').style.color = 'blue';
    }, error => {
      // @ts-ignore
      document.getElementById('like-icon').style.color = '#9f9696';
    });
  }

  // tslint:disable-next-line:typedef
  getById(id: number) {
    this.postService.get(id).subscribe(data => {
      this.post = new FormGroup({
        id: new FormControl(data.id),
        title: new FormControl(data.title),
        image: new FormControl(data.image),
        status: new FormControl(data.status),
        description: new FormControl(data.description),
        content: new FormControl(data.content),
        date: new FormControl(data.date),
        user: new FormControl(data.user.id)
      });
      this.postInstand = {
        id: data.id,
        title: data.title,
        image: data.image,
        status: data.status,
        description: data.description,
        content: data.content,
        date: data.date,
        user: data.user,
        hashtag: data.hashtag,
        count: data.count
      };
      if (this.postInstand.image === null) {
        this.postInstand.image = 'https://photo-cms-bizlive.zadn.vn/uploaded/ngant/2020_04_05/blog_cwsd_geds.jpg';
      }
      console.log(this.postInstand);
    });
  }

  // tslint:disable-next-line:typedef
  sendEmail() {

    if (this.email.controls?.detail.errors?.required || this.email.value.detail.trim() === '') {
      console.log('required');
      this.message = 'Please fill in the form ';
      this.img = 'https://img.icons8.com/color/2x/error--v3.gif';
      // @ts-ignore
    } else if (this.email.controls?.detail.errors?.email) {
      console.log('pattern');
      this.message = 'Wrong email';
      this.img = 'https://img.icons8.com/color/2x/error--v3.gif';
    } else {
      this.message = 'Success';
      this.img = 'https://img.icons8.com/color/2x/good-quality--v2.gif';
      this.postService.shareEmail(this.id, this.email.value.detail).subscribe(() => {
        console.log('ok');
        window.location.reload();
      });
    }
  }

  // tslint:disable-next-line:typedef
  resetModal() {
    this.img = '';
    this.message = '';
    // @ts-ignore
    document.getElementById('receiver-email').value = '';
    this.email.value.detail = '';
  }

  // tslint:disable-next-line:typedef
  createLike() {
    if (sessionStorage.getItem('Id_key')) {
      const like: Like = {
        post: {
          id: this.id
        },
        user: {
          id: this.idUser
        }
      };

      this.likeService.create(like, this.id).subscribe(data => {
          console.log(data);
          // alert('thanh cong');
          this.getById(this.id);
          // @ts-ignore
          document.getElementById('like-icon').style.color = 'blue';
        }, error => {
          this.getById(this.id);
          // alert(error);
          // @ts-ignore
          document.getElementById('like-icon').style.color = '#9f9696';
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  check() {
    if (sessionStorage.getItem('Id_key')) {
      return false;
    } else {
      return true;
    }
  }

  // tslint:disable-next-line:typedef
  getCommentList() {
    this.commentService.getListComment(this.id).subscribe(data => {
      this.listComment = data;
      console.log(this.comments);
    });
  }

  // tslint:disable-next-line:typedef
  createComment() {
    // console.log(this.id);
    this.comments.text = this.commentpost.controls.messages.value;
    console.log(this.comments.text);
    // console.log( sessionStorage.getItem('Id_key'));
    this.comments.id = sessionStorage.getItem('Id_key');
    this.commentService.createComment(this.id, this.comments).subscribe(
      (data: any) => {
        this.commentpost.reset();
        this.getById(this.id);
        this.getCommentList();
        this.status = 'Submitted successfully <img src="https://cdn-icons-png.flaticon.com/128/845/845646.png" height="35" width="35">';
      }, (error: any) => {
        console.log('errrorr');
        this.commentpost.reset();
        this.status = 'Submit error <img src="https://cdn-icons-png.flaticon.com/128/1680/1680012.png" width="35" height="35">';
      }
    );
    // console.log( this.comments);
  }

  // tslint:disable-next-line:typedef
  deleteComment(id: any) {
    // console.log(id);
    this.commentService.deleteComment(id).subscribe(
      (data: any) => {
        // alert("done");
        this.getById(this.id);
        this.getCommentList();
      }, (error: any) => {
        alert('false');
        this.getById(this.id);
        this.getCommentList();
      }
    );
  }

  //
  // getCommentUpdate(id: any){
  //     this.commentService.findById(id).subscribe(data=>{
  //       this.commentNew = new FormGroup({
  //         id: new FormControl(data.id),
  //         text: new FormControl(data.text),
  //         user: new FormControl(data.user.id),
  //         post: new FormControl(data.post.id)
  //       })
  //       console.log(this.commentNew)
  //     })
  // }
  // updateComment(){
  //   if (this.commentNew.value.text.trim() == ''){
  //     this.status = 'No change'
  //     return;
  //   }
  //   const commentUpdate = {
  //     id: this.idUser,
  //     text: this.commentNew.value.id
  //   }
  //   this.commentService.updateComment(this.commentNew.value.post,commentUpdate).subscribe(data=>{
  //     this.status = "Update Success"
  //   },error => {
  //     this.status = "Update False"
  //   })
  // }
  // tslint:disable-next-line:typedef
  tabSize(event: any) {
    this.page = event;
  }

  tableData(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
