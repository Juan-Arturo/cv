import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { PokemonDetail } from '../../../models/pokemon.details';
import { forkJoin, Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,MaterialModule,ReactiveFormsModule,ProgressBarComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit  {


  pokemon: PokemonDetail;
  classicMode: boolean;
  description: string;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private pokemonService: PokemonService) {
    this.pokemon = data.pokemon;
    this.classicMode = data.classicMode;

  }

  ngOnInit(): void {


  this.getDescriotion()
  }


  getAbilities(): string {
    return this.pokemon.abilities.map(response => response.ability.name).join(', ');
  }

  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }


  getDescriotion() {
    this.pokemonService.getPokemonDescription(this.pokemon.id)
      .subscribe((description: string) => {
        this.description = description;
      });
  }
}


