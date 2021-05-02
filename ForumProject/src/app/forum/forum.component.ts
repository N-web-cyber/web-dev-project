import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../models/topic';
import { TopicService } from '../services/topic.service';
import { Discussion } from '../models/discussion';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  logged = false;
  user: User;
  topics: Topic[];
  category_id: number;
  discussion_id: number;
  discussions: Discussion[];

  constructor(private topicService: TopicService,
              private userService: UserService, 
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.category_id = +this.route.snapshot.paramMap.get('category_id');
    this.discussion_id = +this.route.snapshot.paramMap.get('forum_id');
    this.getTopics();
    this.getUser();
  }

  getTopics(): void {
    this.topicService.getDiscussionTopics(this.discussion_id)
      .subscribe(topics => this.topics = topics);
  }

  getUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
      this.userService.getUser().subscribe(user => this.user = user);
    }
  }

  deleteTopic(id: number): void {
    this.topicService.deleteTopic(id).subscribe(res => {
      this.getTopics();
    });
  }
}
