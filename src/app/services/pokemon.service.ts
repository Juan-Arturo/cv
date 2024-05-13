import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { PokemonList } from "../models/pokemon.list";
import { PokemonDetail } from "../models/pokemon.details";

@Injectable({providedIn: 'root'})

export class PokemonService {

    private baseUrl = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        // Retorna un observable con un mensaje de error amigable
        return throwError('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.');
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
                catchError(this.handleError)
            );
    }

    getPokemonDescription(pokemonId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}pokemon-species/${pokemonId}`)
            .pipe(
                map((data: any) => {
                    // La descripción  se encuentra en data.flavor_text_entries
                    return data.flavor_text_entries.find((entry: any) => entry.language.name === 'es').flavor_text;
                }),
                catchError(this.handleError)
            );
    }
}
