import { Component, OnInit } from '@angular/core';
import {HashtagService} from '../../../service/hashtag.service';
import {Hashtag} from '../../../model/hashtag';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-hashtag-create',
  templateUrl: './hashtag-create.component.html',
  styleUrls: ['./hashtag-create.component.css']
})
export class HashtagCreateComponent implements OnInit {
  closeResult = '';
  // @ts-ignore
  url: firebase.storage.UploadTaskSnapshot;
  title = 'cloudsSorage';
  // @ts-ignore
  selectedFile: File = null;
  // @ts-ignore
  fb;
  // @ts-ignore
  downloadURL: Observable<string>;
  hashtagForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  constructor(private hashtagService: HashtagService, private modalService: NgbModal, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }
  // @ts-ignore
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return '';
    }
  }

  create(){
    const hashtag = {
      name: this.hashtagForm.value.name,
      image: this.fb
    }
    this.hashtagService.create(hashtag).subscribe(data =>{
      alert('Create Success')
    })
  };
  onFileSelected(event: any) {
    var n = Date.now();
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
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.url = url;
          console.log(this.url);
        }
      });
  }
}
