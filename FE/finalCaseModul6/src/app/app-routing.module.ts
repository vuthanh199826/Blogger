import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetalComponent} from './detail/detal.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {HashtagPostComponent} from './home/slide-hashtag/hashtag-post/hashtag-post.component';



const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/module/admin.module').then(module => module.AdminModule)},
  {path: 'login', loadChildren: () => import('./authentication/module/login.module').then(module => module.LoginModule)},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user/:id',
    component: UserDetailComponent
  },
  {
    path: 'detail',
    component: DetalComponent
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(module => module.PostModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/module/admin.module').then(module => module.AdminModule)
  },
  {
    path: '',
  component: HomeComponent
  },
  { path: 'post/hashtag/:id', component: HashtagPostComponent},
  // {
  //   path: '**',
  //   component: ErrorComponent
  // }
  {
    path: 'user/:id',
    component: UserDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
