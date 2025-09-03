import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryService, GetCategory} from '../../api/category.service';
import {AsyncPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'filters',
  standalone: true,
  templateUrl: './filter.component.html',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
  ],
})
export class FilterComponent implements OnInit {

  categories$!: Observable<GetCategory[]>;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {

    this.fetchCategories();

    const params = this.route.snapshot.queryParams;

    this.form = this.fb.group({
      categories: this.fb.control(params['categories'] ? [].concat(params['categories']) : []),
      colors: this.fb.control(params['colors'] ? [].concat(params['colors']) : []),
      sortOrder: this.fb.control(params['sortOrder'] || ''),
    });

    this.form.valueChanges.subscribe(value => {
      this.router.navigate([], {
        queryParams: value,
        queryParamsHandling: 'merge',
      });
    });
  }

  onCheckboxChange(event: Event, controlName: 'categories' | 'colors') {
    const checkbox = event.target as HTMLInputElement;
    const current = this.form.get(controlName)?.value ?? [];

    if (checkbox.checked) {
      this.form.get(controlName)?.setValue([...current, checkbox.value], { emitEvent: true });
    } else {
      this.form.get(controlName)?.setValue(current.filter((v: string) => v !== checkbox.value), { emitEvent: true });
    }
  }

  fetchCategories(): void {
    this.categories$ = this.categoryService.getCategories()
  }
}
