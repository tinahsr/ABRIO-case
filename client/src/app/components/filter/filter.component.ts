import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService, GetCategory} from '../../api/category.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'filters',
  standalone: true,
  templateUrl: './filter.component.html',
  imports: [
    AsyncPipe,
  ],
})
export class FilterComponent implements OnInit {

  categories$!: Observable<GetCategory[]>;

  constructor(
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {

    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categories$ = this.categoryService.getCategories()
  }
}
