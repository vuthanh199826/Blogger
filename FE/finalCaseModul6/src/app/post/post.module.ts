import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostCreateComponent } from './post-create/post-create.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import {PostEditComponent} from './post-edit/post-edit.component';
import {NgbAccordionModule, NgbDatepickerModule, NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginModule} from "../authentication/module/login.module";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {PostListAuthorComponent} from './post-list-author/post-list-author.component';




@NgModule({
  declarations: [
    PostListComponent,
    PostViewComponent,
    PostCreateComponent,
    PostEditComponent,
    PostListAuthorComponent
  ],
  exports: [
    PostListComponent
  ],
    imports: [
        CommonModule,
        PostRoutingModule,
        ReactiveFormsModule,
        EditorModule,
        NgxPaginationModule,
        NgbTooltipModule,
        NgbDatepickerModule,
        FormsModule,
        NgbTypeaheadModule,
        AutocompleteLibModule,
        LoginModule,
        LoginModule,
        NgbAccordionModule
    ]
})
export class PostModule { }
