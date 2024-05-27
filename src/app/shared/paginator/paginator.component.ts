import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() visiblePages: number[] = [];

  @Output() pageChange = new EventEmitter<number>();

  previousPage(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  specificPage(page: number): void {
    this.pageChange.emit(page);
  }




}
