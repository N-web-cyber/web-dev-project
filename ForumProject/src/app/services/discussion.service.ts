import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discussion } from '../models/discussion';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  BASE_URL = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.BASE_URL}/discussions/`);
  }

  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.BASE_URL}/discussions/${id}/`);
  }

  getCategoryDiscussions(category_id: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.BASE_URL}/categories/${category_id}/discussions/`);
  }
}
