import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EMPTY, Observable, empty, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { PokemonList } from "../models/pokemon.list";
import { PokemonDetail } from "../models/pokemon.details";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class PokemonService {

    private baseUrl = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

    private handleError(err: HttpErrorResponse): Observable<never> {
      if (err.status === 404) {
        this.snackBar.open('Lo siento, Pokémon no encontrado', 'continuar', {
          duration: 5000,
        });
        return EMPTY;
      } else {
        // Maneja otros errores aquí (opcional)
        // Puedes registrar el error, volver a lanzarlo o mostrar un mensaje de error genérico
        console.error('Ocurrió un error:', err);
        return EMPTY // Vuelve a lanzar el error para su posterior manejo
      }
    }


    getPokemonList(offset: number, limit: number): Observable<PokemonList[]> {
        return this.http.get<PokemonList[]>(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`)
            .pipe(
                map((response: any) => response.results),
                catchError(this.handleError)
            );
    }

    getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${pokemon}`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        this.snackBar.open('Lo siento, Pokémon no encontrado', 'continuar', {
                            duration: 5000,
                        });

                        return EMPTY;

                    } else {
                        this.snackBar.open('Error al buscar Pokémon', 'continuar', {
                            duration: 5000,
                        });
                        return EMPTY;
                    }

                })
            );
    }

    getPokemonDescription(pokemonId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}pokemon-species/${pokemonId}`)
            .pipe(
                map((data: any) => {
                    // La descripción se encuentra en data.flavor_text_entries
                    return data.flavor_text_entries.find((entry: any) => entry.language.name === 'es').flavor_text;
                }),
                catchError(this.handleError)
            );
    }
}
