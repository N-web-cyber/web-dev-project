import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from '../models/discussion';

import { User } from '../models/user';
import { DiscussionService } from '../services/discussion.service';
import { TopicService } from '../services/topic.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {

  title = '';
  descripition = '';
  user: User;
  discussions: Discussion[];
  selectedDisucssion: Discussion;

  constructor(
    private route: Router,
    private topicService: TopicService,
    private discussionService: DiscussionService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getDiscussions();
    this.getUser();
  }

  getDiscussions(): void {
    this.discussionService.getDiscussions().subscribe(data => {
      this.discussions = data;
    });
  }

  getUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUser().subscribe(user => this.user = user);
    }
  }

  clear(): void {
    this.title = '';
    this.descripition = '';
  }

  addTopic(): void {
    if (!this.check()) {
      return;
    }
    this.topicService.addTopic(this.title, this.descripition, this.user.id, this.selectedDisucssion.id)
      .subscribe(topic => {
        const params = ['/category', topic.discussion.category.id, 'forum', topic.discussion.id, 'topic-detail', topic.id];
        this.route.navigate(params);
      });
  }


  check(): boolean {
    return Boolean(this.descripition && this.title && this.selectedDisucssion);
  }
}
