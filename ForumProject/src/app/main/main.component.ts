import { Component, OnInit } from '@angular/core';

import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Category[] = [];
  logged = false;

  constructor(private categoryService: CategoryService,
              private discussionService: DiscussionService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categories.forEach(category => this.getCategoryDiscussions(category));
    });
  }

  getCategoryDiscussions(category: Category): void {
    this.discussionService.getCategoryDiscussions(category.id).subscribe(data => {
      category.discussions = data;
    });
  }

}
