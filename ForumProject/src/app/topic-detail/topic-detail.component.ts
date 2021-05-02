import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../models/topic';
import { Comment } from '../models/comment'
import { TopicService } from '../services/topic.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic: Topic;
  content = '';
  logged = false;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private commentService: CommentService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getTopic();
    this.getUser();
  }

  getUser(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.logged = true;
    this.userService.getUser().subscribe(user => this.user = user);
  }

  getTopic(): void {
    const id = +this.route.snapshot.paramMap.get('topic_id');
    this.topicService.getTopic(id).subscribe(topic => {
      this.topic = topic;
      this.commentService.getTopicComments(this.topic.id).subscribe(data => {
        this.topic.comments = data;
      });
    });
  }

  addComment(): void {
    this.commentService.addComment(this.content, this.user.id, this.topic.id).subscribe(res => {
      this.content = '';
      this.getTopic();
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(res => {
      this.getTopic();
    });
  }

  save(): void {
    this.topicService.updateTopic(this.topic).subscribe(topic => this.topic = topic);
    location.reload();
  }
}
