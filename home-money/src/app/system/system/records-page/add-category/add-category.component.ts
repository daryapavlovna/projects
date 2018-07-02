import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'home-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    const category = new Category(name, capacity);
    this.categoriesService.addCategory(category).subscribe((categ: Category) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.onCategoryAdd.emit(category);
    });
  }
}
