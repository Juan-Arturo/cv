import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nasa',
  standalone: true,
  imports: [CommonModule,FormsModule,MaterialModule,LazyLoadImageModule,RouterOutlet],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export class NasaComponent implements OnInit {


  constructor(){

  }

  ngOnInit() {

  }



}
