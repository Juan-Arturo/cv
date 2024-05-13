import { Pipe, PipeTransform } from '@angular/core';
import { PokemonDetail } from '../models/pokemon.details';

@Pipe({
  name: 'filtro',
  standalone: true
})
export class FiltroPipe implements PipeTransform {

  transform(pokemon: PokemonDetail[],): PokemonDetail[] {
   return []
  }

}
