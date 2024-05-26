import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../../services/nasa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { StripHtmlTagsPipe } from '../../../pipes/strip-html-tags.pipe';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';

@Component({
  selector: 'app-tech-transfer',
  standalone: true,
  imports: [CommonModule,FormsModule,
    MaterialModule,LazyLoadImageModule,
    StripHtmlTagsPipe, PaginatorComponent ],
  templateUrl: './tech-transfer.component.html',
  styleUrl: './tech-transfer.component.css'
})
export class TechTransferComponent implements OnInit {
  techTransferData: any = {}; //inicializo un objeto
  currentPage: number = 0;
  perPage: number = 5;
  totalResults: number = 0;
  pagedResults: any[] = [];

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.getTechTransfer();
  }

  getTechTransfer(): void {
    this.nasaService.getTechTransfer().subscribe(response => {
      this.techTransferData = response;
      this.totalResults = response.total;
      this.updatePagedResults();
    });
  }

  updatePagedResults(): void {
    const startIndex = this.currentPage * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.pagedResults = this.techTransferData.results.slice(startIndex, endIndex);
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagedResults();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedResults();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.perPage);
  }



  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagedResults();
  }


  get visiblePages(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const visiblePagesCount = 5; // Número de páginas visibles a la vez
    const halfVisiblePages = Math.floor(visiblePagesCount / 2);
    let startPage = Math.max(0, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages - 1, startPage + visiblePagesCount - 1);

    // Ajustar el inicio y el final si estamos cerca de los extremos
    const pagesNeeded = visiblePagesCount - (endPage - startPage + 1);
    if (startPage === 0) {
      endPage = Math.min(totalPages - 1, endPage + pagesNeeded);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(0, startPage - pagesNeeded);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }


}



