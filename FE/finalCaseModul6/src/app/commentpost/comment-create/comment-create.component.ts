import { Component, OnInit } from '@angular/core';
import {IComment} from '../../model/comment';
import {CommmentpostService} from '../../services/commmentpost.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  constructor(private commentServicePost: CommmentpostService) {
  }

  ngOnInit(): void {
  }
   }
