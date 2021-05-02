import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getComments(): Observable<Comment[]> {
    const url = `${this.BASE_URL}/comments/`;
    return this.http.get<Comment[]>(url);
  }

  addComment(content: string, author_id: number, topic_id: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/comments/`, {
      content,
      author_id,
      topic_id,
    })
  }

  getComment(id: number): Observable<Comment> {
    const url = `${this.BASE_URL}/comments/${id}/`;
    return this.http.get<Comment>(url);
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.BASE_URL}/comments/${id}/`;
    return this.http.delete<Comment>(url);
  }

  getTopicComments(id: number): Observable<Comment[]> {
    const url = `${this.BASE_URL}/topics/${id}/comments/`;
    return this.http.get<Comment[]>(url);
  }
}
