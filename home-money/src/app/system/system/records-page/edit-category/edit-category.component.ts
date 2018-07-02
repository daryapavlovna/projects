import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../shared/models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import {Message} from '../../../../shared/models/message.model';

@Component({
  selector: 'home-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    const { name, capacity } = form.value;
    const category = new Category( name, capacity, +this.currentCategoryId);
    this.categoriesService.updateCategory(category).subscribe((categ: Category) => {
      this.onCategoryEdit.emit(category);
      this.message.text = 'Категория успешно отредактирована';
      setTimeout(() => {
        this.message.text = '';
      }, 5000);
    });
  }

}
