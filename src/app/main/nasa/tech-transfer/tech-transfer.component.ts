import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../../services/nasa.service';
import { response } from 'express';
import { TechTransferResult } from '../../../interfaces/nasa/TechTransfer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-tech-transfer',
  standalone: true,
  imports: [CommonModule,FormsModule,MaterialModule,LazyLoadImageModule],
  templateUrl: './tech-transfer.component.html',
  styleUrl: './tech-transfer.component.css'
})
export class TechTransferComponent implements OnInit {
  techTransferData: TechTransferResult[] =[];


  constructor(private nasaService: NasaService){

  }

  ngOnInit(): void {
   this.getTechTransfer();
  }

  getTechTransfer(): void {
    this.nasaService.getTechTransfer().subscribe(response => {
      this.techTransferData = response;
    });
  }
}
