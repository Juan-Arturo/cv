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


  /*inicializo un objeto que ocupamos
  para  guardar informacion de nuestro
  servicio*/
  techTransferData: any = {};


  /*atributos para la paginacion */
  currentPage: number = 0;
  perPage: number = 5; //numero de elementos que veo por pagina
  totalResults: number = 0; //areglo donde se guardan results
  pagedResults: any[] = [];


  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.getTechTransfer();
  }


  /*obtengo mis datos desde el servicio de la api */
  getTechTransfer(): void {
    this.nasaService.getTechTransfer().subscribe(response => {
      this.techTransferData = response;
      this.totalResults = response.total;
      this.updatePagedResults();

      
    });
  }


  /*metodos para la paginacion */


  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedResults();
    this.scrollToTop();
  }


  updatePagedResults(): void {
    const startIndex = this.currentPage * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.pagedResults = this.techTransferData.results.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.perPage); // Math.ceil redondea de forma ascendente
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


  scrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });  // Smooth scrolling
  }

}


