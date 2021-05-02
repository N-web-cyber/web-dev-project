import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ForumComponent } from './forum/forum.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { CategoryPageComponent } from './category-page/category-page.component';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'category/:id', component: CategoryPageComponent },
  { path: 'category/:category_id/forum/:forum_id', component: ForumComponent },
  { path: 'category/:category_id/forum/:forum_id/topic-detail/:topic_id', component: TopicDetailComponent },
  { path: 'category/:category_id/forum/:forum_id/new-topic', component: NewTopicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
