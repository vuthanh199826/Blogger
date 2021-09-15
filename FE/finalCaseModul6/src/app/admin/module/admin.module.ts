import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from '../component/admin-home/admin.component';
import {NgbButtonsModule, NgbDatepickerModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AppModule} from '../../app.module';
import {UserManagementComponent} from '../component/user/user-list/user-management.component';
import {UserEditComponent} from '../component/user/user-edit/user-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HashtagListComponent} from '../component/hashtag/hashtag-list/hashtag-list.component';
import {HashtagCreateComponent} from '../component/hashtag/hashtag-create/hashtag-create.component';
import {HashtagDeleteComponent} from '../component/hashtag/hashtag-delete/hashtag-delete.component';
import {HashtagEditComponent} from '../component/hashtag/hashtag-edit/hashtag-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {PostAdminEditComponent} from '../component/post-admin/post-admin-edit/post-admin-edit.component';
import {PostListComponent} from '../../post/post-list/post-list.component';
import {PostAdminListComponent} from '../component/post-admin/post-admin-list/post-admin-list.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    AdminComponent,
    UserManagementComponent,
    UserEditComponent,
    HashtagListComponent,
    HashtagCreateComponent,
    HashtagDeleteComponent,
    HashtagEditComponent,
    PostAdminEditComponent,
    PostAdminListComponent
  ],
  exports: [
    AdminComponent,
    UserManagementComponent,
    PostAdminListComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgbNavModule,
        NgbButtonsModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        AutocompleteLibModule,
        NgbDatepickerModule,
    ]
})
export class AdminModule { }
