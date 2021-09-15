import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetalComponent } from './detail/detal.component';
import { AdminComponent } from './admin/component/admin-home/admin.component';
import {AdminModule} from './admin/module/admin.module';
import { LoginComponent } from './authentication/component/login/login.component';
import { UserManagementComponent } from './admin/component/user/user-list/user-management.component';
import { UserEditComponent } from './admin/component/user/user-edit/user-edit.component';
import { HashtagListComponent } from './admin/component/hashtag/hashtag-list/hashtag-list.component';
import { HashtagCreateComponent } from './admin/component/hashtag/hashtag-create/hashtag-create.component';
import { HashtagDeleteComponent } from './admin/component/hashtag/hashtag-delete/hashtag-delete.component';
import { HashtagEditComponent } from './admin/component/hashtag/hashtag-edit/hashtag-edit.component';
import { AdsComponent } from './shared-module/ads/ads.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HotNewComponent } from './home/hot-new/hot-new.component';
import { AboutUsHomeComponent } from './home/about-us-home/about-us-home.component';
import { FollowUsHomeComponent } from './home/follow-us-home/follow-us-home.component';
import { RecentPostComponent } from './home/recent-post/recent-post.component';
import { SignupEmailAdsComponent } from './home/signup-email-ads/signup-email-ads.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {NgbNavModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PostModule} from './post/post.module';
import {EditorModule} from '@tinymce/tinymce-angular';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {NavbarComponent} from './shared-module/navbar/navbar.component';
import {LoginModule} from './authentication/module/login.module';
import { SlideHashtagComponent } from './home/slide-hashtag/slide-hashtag.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostAdminListComponent } from './admin/component/post-admin/post-admin-list/post-admin-list.component';
import { PostAdminEditComponent } from './admin/component/post-admin/post-admin-edit/post-admin-edit.component';
import { FooterComponent } from './home/footer/footer.component';
import { InstaramComponent } from './home/instaram/instaram.component';
import { RecentViewComponent } from './home/recent-view/recent-view.component';
import { TopNewPostComponent } from './home/top-new-post/top-new-post.component';
import {MypostComponent} from './user-detail/mypost/mypost.component';
import { HashtagPostComponent } from './home/slide-hashtag/hashtag-post/hashtag-post.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ChangePasswordComponent } from './user-detail/change-password/change-password.component';
import {CommentListComponent} from './commentpost/comment-list/comment-list.component';
import {CommentCreateComponent} from './commentpost/comment-create/comment-create.component';
import {CommentEditComponent} from './commentpost/comment-edit/comment-edit.component';
import {CommentDeleteComponent} from './commentpost/comment-delete/comment-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetalComponent,
    NavbarComponent,
    AdsComponent,
    SlideHashtagComponent,
    HotNewComponent,
    AboutUsHomeComponent,
    FollowUsHomeComponent,
    RecentPostComponent,
    SignupEmailAdsComponent,
    UserDetailComponent,
    UserDetailComponent,
    FooterComponent,
    InstaramComponent,
    RecentViewComponent,
    TopNewPostComponent,
    MypostComponent,
    HashtagPostComponent,
    ChangePasswordComponent,
    CommentListComponent,
    CommentCreateComponent,
    CommentEditComponent,
    CommentDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    NgxPaginationModule,
    NgbNavModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HttpClientModule,
    EditorModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    LoginModule,
    NgbNavModule,
    FormsModule,
    NgbTypeaheadModule,
    AutocompleteLibModule
  ],
  providers: [],
    exports: [
        NavbarComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
