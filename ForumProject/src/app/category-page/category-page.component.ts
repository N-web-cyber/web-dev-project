import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  category: Category;
  constructor(private categoryService: CategoryService,
              private discussionService: DiscussionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id).subscribe(category => {
      this.category = category;
      this.getDiscussions();
    });
  }

  getDiscussions(): void {
    this.discussionService.getCategoryDiscussions(this.category.id).subscribe(data => {
      this.category.discussions = data;
    });
  }
}
