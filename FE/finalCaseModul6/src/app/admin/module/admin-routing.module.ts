import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from '../component/admin-home/admin.component';
import {UserManagementComponent} from '../component/user/user-list/user-management.component';
import {UserEditComponent} from '../component/user/user-edit/user-edit.component';
import {HashtagListComponent} from '../component/hashtag/hashtag-list/hashtag-list.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      {path: 'user/edit/:id', component: UserEditComponent},
      {path: 'hashtag/edit/:id', component: UserEditComponent},
    ],

  },
  {path: 'users', component: UserManagementComponent},
  {path: 'hashtags', component: HashtagListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
