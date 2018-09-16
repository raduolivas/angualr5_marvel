import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import { map, catchError, timestamp } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class Marvelervice {
    private marvelCharactersUrl = "http://gateway.marvel.com/v1/public/";
    private publicKey = "cc41a84866f3b327adb589068e227f68";
    private privateKey = "8bd7c4ec7c56f94402ffa3616a81eef036567528";

    constructor(private httpClient: HttpClient) {}

    private getHashKey(timestamp: string) : string {
        let hash : Md5 = new Md5();
        hash.appendStr(timestamp);
        hash.appendStr(this.privateKey);
        hash.appendStr(this.publicKey);
        let hashed : string = hash.end().toString();
        return hashed;
    }

    private getTs() {
        return new Date().valueOf().toString();
    }

    public getCharacters(limit : number = 10, prefix : string= null) : Observable<Character[]> {
        let timeStamp = this.getTs();
        let hash = this.getHashKey(timeStamp);

        let url = this.marvelCharactersUrl + "characters?"+  "limit="+ limit+ "&ts=" + timeStamp + "&apikey=" + this.publicKey + "&hash=" + hash ;
        
        if (prefix) {
            url += "&nameStartsWith" + prefix;
        }

        return this.httpClient.get<Character[]>(url).pipe(
            catchError(this.errorHandler),
            map((characters) => this.handleCharacters(characters))
        
        );
    }

    public getCharacterById(id : string) : Observable<Character> {
        let timeStamp = this.getTs();
        let hash = this.getHashKey(timeStamp);

        let url = this.marvelCharactersUrl + "/" + id + "?apiKey=" + this.publicKey;

        return this.httpClient.get<Character>(url).pipe(
            catchError(this.errorHandler),
            map((character) => this.handleCharacter(character))
        
        );
    }

    private errorHandler(error: Response){
        console.log(error)
        return _throw(error);
    }

    private handleCharacter(response : any): Character {
        return new Character(
            response.id,
            response.name,
            response.description,
            response.thumbnail
        )
    }

    private handleCharacters(response : any): Character[] {
        const characters: Character[] = [];
        response.forEach(element => {
            const character = new Character(
                element.id,
                element.name,
                element.description,
                element.thumbnail
            )
            characters.push(character);
        });

        return characters;
    }
}