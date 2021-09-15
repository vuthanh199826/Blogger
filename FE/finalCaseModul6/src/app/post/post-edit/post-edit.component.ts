import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../service/post.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {HashtagService} from '../../admin/service/hashtag.service';
import {finalize} from 'rxjs/operators';
import {Post} from '../../model/post';
import {TokenService} from '../../authentication/service/token.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  idUser = sessionStorage.getItem('Id_key');
  title = 'cloudsSorage';
  notification = '';
  notificationImg = '';
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  // @ts-ignore
  post: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(),
    status: new FormControl('public'),
    description: new FormControl(),
    content: new FormControl('', [Validators.required]),
    date: new FormControl(),
    user: new FormControl(),
    hashtag: new FormControl()
  });
  tinymceinit: any;
  hashtags: any;
  // @ts-ignore
  idPost: number;
  navigateTo = '';
  progress = 0;
  uploading = false;

  constructor(private postService: PostService,
              private storage: AngularFireStorage,
              private router: Router,
              private hashtagService: HashtagService,
              private activatedRouter: ActivatedRoute,
              private tokenService: TokenService) {
    this.activatedRouter.paramMap.subscribe(data => {
      // @ts-ignore
      this.idPost = +data.get('id');
    });
    this.hashtagService.getAll().subscribe(data => {
      this.hashtags = data;
      // console.log(this.hashtags);
    });
    this.tinymceinit = {
      height: 500,
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern',
      ],
      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      // tslint:disable-next-line:typedef only-arrow-functions
      file_picker_callback(cb: (arg0: any, arg1: { title: string; }) => void, value: any, meta: any) {
        // tslint:disable-next-line:prefer-const
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        // tslint:disable-next-line:typedef only-arrow-functions
        input.onchange = function() {
          // @ts-ignore
          // tslint:disable-next-line:prefer-const
          let file = input.files[0];
          // tslint:disable-next-line:prefer-const
          let reader = new FileReader();
          // tslint:disable-next-line:typedef only-arrow-functions
          reader.onload = function() {
            // tslint:disable-next-line:prefer-const
            let id = 'blobid' + (new Date()).getTime();
            // @ts-ignore
            // tslint:disable-next-line:prefer-const
            let blobCache = tinymce.activeEditor.editorUpload.blobCache;
            // @ts-ignore
            // tslint:disable-next-line:prefer-const
            let base64 = reader.result.split(',')[1];
            // tslint:disable-next-line:prefer-const
            let blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);
            cb(blobInfo.blobUri(), {title: file.name});
          };
          reader.readAsDataURL(file);
        };

        input.click();
      }
    };
    // @ts-ignore
    this.getById(this.idPost);
    // console.log(this.getTitle());
    this.blockLink();
  }

  // tslint:disable-next-line:typedef
  blockLink() {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getById(id: number) {
    this.postService.get(id).subscribe(data => {
      this.post = new FormGroup({
        title: new FormControl(data.title),
        image: new FormControl(data.image),
        status: new FormControl(data.status),
        description: new FormControl(data.description),
        content: new FormControl(data.content),
        date: new FormControl(data.date),
        user: new FormControl(data.user),
        hashtag: new FormControl(data.hashtag.id)
      });
      this.fb = data.image;
    });
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              if (file.name[file.name.length - 1] !== 'g'){
                this.fb = 'wrong';
              }else {
                this.fb = url;
              }
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.uploading = true;
          this.progress = Math.round(url.bytesTransferred / url.totalBytes * 100);
          if (this.progress === 100) {
            this.uploading = false;
          }
        }
      });
  }

  // tslint:disable-next-line:typedef
  update() {
    const newPost: Post = this.post.value;
    newPost.id = this.idPost;
    newPost.hashtag = {id: +this.post.value.hashtag};
    newPost.image = this.fb;

    // @ts-ignore
    if (newPost.title.trim() === '') {
      this.notification = 'Thiếu title';
      this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
    } else if (newPost.content?.trim() === '') {
      this.notification = 'Thiếu content';
      this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
    } else if (this.fb === 'wrong') {
      this.notification = 'File tải lên không phải ảnh, Thử lại !';
      this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
    } else {
      this.postService.edit(newPost).subscribe(data => {
        console.log(data);
        this.notification = 'success';
        this.notificationImg = 'https://img.icons8.com/color/2x/good-quality--v2.gif';
        this.navigateTo = '/user/' + this.idUser;
        // this.router.navigate(['/user/' + this.idUser]);
      });
    }

    console.log(newPost);
  }

  // tslint:disable-next-line:typedef
  // reset() {
  //   this.getById(this.idPost);
  //   this.notification = ' reset done ';
  //   this.notificationImg = 'https://img.icons8.com/color/2x/good-quality--v2.gif';
  //   this.navigateTo = '/post/edit/' + this.idPost;
  // }

}
