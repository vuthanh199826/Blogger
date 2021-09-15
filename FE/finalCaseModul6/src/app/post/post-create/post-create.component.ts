import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../service/post.service';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HashtagService} from '../../admin/service/hashtag.service';
import {TokenService} from '../../authentication/service/token.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = 'cloudsSorage';
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb = 'https://photo-cms-bizlive.zadn.vn/uploaded/ngant/2020_04_05/blog_cwsd_geds.jpg';
  // @ts-ignore
  downloadURL: Observable<string>;
  // @ts-ignore
  post: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    status: new FormControl('public'),
    description: new FormControl(),
    content: new FormControl('', [Validators.required]),
    date: new FormControl(),
    user: new FormControl(),
    hashtag: new FormControl('1')
  });
  tinymceinit: any;
  hashtags: any;
  notification = '';
  notificationImg = '';
  progress = 0;
  uploading = false;

  constructor(private tokenService: TokenService,
              private postService: PostService,
              private storage: AngularFireStorage,
              private router: Router,
              private hashtagService: HashtagService
  ) {
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
    this.blockLink();
    // console.log(this.getTitle());
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
  getTitle() {
    // @ts-ignore
    return this.post.get('title');
  }

  // tslint:disable-next-line:typedef
  create() {
    // @ts-ignore
    if (sessionStorage.getItem('Id_key')) {
      const newPost = this.post.value;
      newPost.user = {id: sessionStorage.getItem('Id_key')};
      // @ts-ignore
      newPost.date = new Date();
      newPost.hashtag = {id: this.post.value.hashtag};
      newPost.image = this.fb;
      // if (newPost.image === '') {
      //   newPost.image = 'https://photo-cms-bizlive.zadn.vn/uploaded/ngant/2020_04_05/blog_cwsd_geds.jpg';
      // }
      console.log(newPost);
      if (newPost.title.trim() === '' || newPost.title === null) {
        this.notification = 'Missing title';
        this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
      } else if (newPost.content.trim() === '' || newPost.content === null) {
        this.notification = 'Missing content';
        this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
      } else if (this.fb === 'wrong') {
        this.notification = 'Wrong image !';
        this.notificationImg = 'https://img.icons8.com/color/2x/error--v3.gif';
      } else {
        this.postService.create(newPost).subscribe(() => {
        });
        this.notification = 'success';
        this.notificationImg = 'https://img.icons8.com/color/2x/good-quality--v2.gif';
        this.reset();
      }
    } else {
      console.log('qq, đăng nhập đê');
    }
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  onFileSelected(event) {

    const n = Date.now();
    const file = event.target.files[0];
    console.log(file.name);
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
              if (file.name[file.name.length - 1] !== 'g') {
                this.fb = 'wrong';
              } else {
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
  setDefaultImg() {
    this.fb = 'https://photo-cms-bizlive.zadn.vn/uploaded/ngant/2020_04_05/blog_cwsd_geds.jpg';
  }

  // tslint:disable-next-line:typedef
  reset() {
    this.post = new FormGroup({
      title: new FormControl(''),
      image: new FormControl(''),
      status: new FormControl('public'),
      description: new FormControl(),
      content: new FormControl('', [Validators.required]),
      date: new FormControl(),
      user: new FormControl(),
      hashtag: new FormControl('1')
    });
  }
}
