import { Component,OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from '../../models/pokemon.details';
import { PokemonList } from '../../models/pokemon.list';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokedex/pokemon-detail/pokemon-detail.component';
import { CommonModule } from '@angular/common';
// import { PokeapiService } from '../../services/pokeapi.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule,FormsModule,
           MaterialModule,ReactiveFormsModule,
          RouterLink],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit {

  search: FormControl = new FormControl('');
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = false;
  private offset: number;
  isLoading: boolean;
  isLastPage = false;
  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;



  pageIndex:number=0;
  pageSize:number=0;
  limit:number=50;




  constructor(private pokemonService: PokemonService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) {

              }

   ngOnInit(): void {

    this.welcomeMessage();

    this.pageIndex = 0;
    this.pageSize =6;
    this.getPokelist(this.pageIndex, this.pageSize);

  }
  onSearchPokemon(): void {
    const lowercaseValue = this.search.value.toLowerCase(); // Convert to lowercase
    if (lowercaseValue === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(lowercaseValue)
        .subscribe((pokemon: PokemonDetail) => {
          this.searchPokemon = pokemon;
          this.isLoading = false;
        });
    }
  }


  getPokelist(pageIndex: number, pageSize: number) {
      this.pokemonService.getPokemonList(pageIndex * pageSize,this.limit)
        .subscribe((list: PokemonList[]) => {
          this.getPokemon(list);
      });

  }



  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      pokemons.forEach((pokemon) => {
        if (!this.pokemons.find((p) => p.id === pokemon.id)) {
          this.pokemons.push(pokemon);
        }
      });
      this.offset += list.length; // Actualiza el valor de offset para apuntar al siguiente conjunto de Pokémon
      this.isLoading = false;
    });


}



  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

  onDetail(pokemon: PokemonDetail): void {
    this.bottomSheet.open(PokemonDetailComponent, {
      data: {pokemon, classicMode: this.classicMode}
    })
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getPokelist(this.pageIndex, this.pageSize);
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.pokemons.length) {
      this.pageIndex++;
      this.getPokelist(this.pageIndex, this.pageSize);
    }
  }

  resetSearch(): void {
    this.isSearching = false;
    this.searchPokemon = new PokemonDetail(); // Limpiar el objeto de búsqueda
  }




   // Método para mostrar la alerta de bienvenida
   welcomeMessage(): void {
    Swal.fire("Sección demostrativa de mis conocimientos en servicios API RESTful");
  }

}

     // onScroll(event: Event): void {
  //   const element: HTMLDivElement = event.target as HTMLDivElement;
  //   if(element.scrollHeight - element.scrollTop < 1000) {
  //     this.getPage(this.offset);
  //   }
  // }





