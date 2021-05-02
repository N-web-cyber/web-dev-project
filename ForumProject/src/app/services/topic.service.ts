import { Injectable } from '@angular/core';
import { Topic } from '../models/topic';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  BASE_URL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    const url = `${this.BASE_URL}/topics/`;
    return this.http.get<Topic[]>(url);
  }

  addTopic(title: string, description: string, author_id: number, discussion_id: number): Observable<Topic> {
    const url = `${this.BASE_URL}/topics/`;
    return this.http.post<Topic>(url, {
      title,
      description,
      author_id,
      discussion_id,
    });
  }

  getTopic(id: number): Observable<Topic> {
    const url = `${this.BASE_URL}/topics/${id}/`;
    return this.http.get<Topic>(url);
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/topics/${id}/`);
  }

  updateTopic(topic: Topic): Observable<Topic> {
    const url = `${this.BASE_URL}/topics/${topic.id}/`;
    return this.http.put<Topic>(url, {
      title: topic.title,
      description: topic.description,
      author_id: topic.author.id,
      discussion_id: topic.discussion.id,
    });
  }

  getDiscussionTopics(id: number): Observable<Topic[]> {
    const url = `${this.BASE_URL}/discussions/${id}/topics/`;
    return this.http.get<Topic[]>(url);
  }
}
