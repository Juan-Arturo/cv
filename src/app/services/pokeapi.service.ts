import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {

  private tipoTraduccion: {[key: string]: string} = {
    "normal": "normal",
    "fighting": "lucha",
    "flying": "volador",
    "poison": "veneno",
    "ground": "tierra",
    "rock": "roca",
    "bug": "bicho",
    "ghost": "fantasma",
    "steel": "acero",
    "fire": "fuego",
    "water": "agua",
    "grass": "planta",
    "electric": "eléctrico",
    "psychic": "psíquico",
    "ice": "hielo",
    "dragon": "dragón",
    "dark": "siniestro",
    "fairy": "hada"
  };

  constructor(private http: HttpClient) { }

//   getPokemonByName(Pokename: string): Observable<any> {
//     return this.http.get(`https://pokeapi.co/api/v2/pokemon/${Pokename}`);
//   }


//   getPokemonTypes(pokemonName: string): Observable<any> {
//     return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//       .pipe(
//         map((data: any) => {
//           return data.types.map((type: any) => this.tipoTraduccion[type.type.name]);
//         })
//       );
//   }


//   getPokemonDescription(pokemonId: number): Observable<any> {
//     return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
//       .pipe(
//         map((data: any) => {
//           // La descripción a menudo se encuentra en data.flavor_text_entries
//           // Puedes filtrar el array para obtener la descripción en inglés u otro idioma si lo prefieres
//           return data.flavor_text_entries.find((entry: any) => entry.language.name === 'es').flavor_text;
//         })
//       );
//   }
// }







// import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
// import { Observable } from 'rxjs';
// import { PokemonList } from "../models/pokemon.list";
// import { PokemonDetail } from "../models/pokemon.details";
// import { map } from "rxjs/operators";


// @Injectable({providedIn: 'root'})
// export class PokemonService {

//     private baseUrl = 'https://pokeapi.co/api/v2/';

//     constructor(private http: HttpClient) { }


//     getPokemonList(offset: number, limit: number) : Observable<PokemonList[]> {
//         return this.http.get<PokemonList[]>(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`) //this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit
//         .pipe(
//             map((response: any) => response.results)
//         );
//     }

//     getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
//         return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${pokemon}`); //this.baseUrl + 'pokemon/' + pokemon
//     }

//     getPokemonDescription(pokemonId: number): Observable<any> {
//         return this.http.get(`${this.baseUrl}pokemon-species/${pokemonId}`)
//           .pipe(
//             map((data: any) => {
//               // La descripción  se encuentra en data.flavor_text_entries
//               return data.flavor_text_entries.find((entry: any) => entry.language.name === 'es').flavor_text;
//             })
//           );
//       }





}
