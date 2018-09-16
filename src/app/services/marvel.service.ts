import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import { map, catchError, timestamp } from 'rxjs/operators';
import { EventsImages } from '../models/eventsImages.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class MarvelService {
    private marvelCharactersUrl = "http://gateway.marvel.com/v1/public/";
    private publicKey = "cc41a84866f3b327adb589068e227f68";
    private privateKey = "8bd7c4ec7c56f94402ffa3616a81eef036567528";
    private eventsImages : EventsImages[] = [];

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

    public getCharacters(limit : number = 20, prefix : string= null) : Observable<Character[]> {
        let params = this.setRequestParams();
        let url = this.marvelCharactersUrl + "characters?" + "limit="+ limit+ params ;
        
        if (prefix) {
            url += "&nameStartsWith" + prefix;
        }

        return this.httpClient.get<Character[]>(url).pipe(
            catchError(this.errorHandler),
            map((characters) => this.handleCharacters(characters))
        
        );
    }

    public getEventImgList(listOfEvents: any) : Observable<EventsImages[]> {
        let params = this.setRequestParams();
        // let _params = "?ts=" + params.timeStamp + "&apikey=" + this.publicKey + "&hash=" + params.hash;

        let url = listOfEvents.length ? listOfEvents[0].resourceURI + params : "";
        
        this.eventsImages = [];

        //TODO: It need to be a loop of requests for each event item
        return this.httpClient.get(url).pipe(
            catchError(this.errorHandler),
            map((response) => this.setEventImages(response))
        );
    }

    //TODO: Inprove needed -> This method handles only the first event image
    private setEventImages(response : any) {

        response.data.results.forEach(element => {
            const eventImage = new EventsImages(
                element.thumbnail.path,
                element.thumbnail.extension,
                
            )
            this.eventsImages.push(eventImage);
        })
        return this.eventsImages;
    }

    public getCharacterById(id : string) : Observable<Character> {
        const params = this.setRequestParams();

        let url = this.marvelCharactersUrl + "characters/" + id + params;

        return this.httpClient.get<Character>(url).pipe(
            catchError(this.errorHandler),
            map((character) => this.handleCharacter(character))
        
        );
    }

    private errorHandler(error: Response){
        console.log(error)
        return _throw(error);
    }

    private setRequestParams() {
        let ts = this.getTs();
        return "?ts=" + ts+ "&apikey=" + this.publicKey + "&hash=" + this.getHashKey(ts);
    }

    private handleCharacter(response : any): Character {
        const character = response.data.results[0];
        return new Character(
            character.id,
            character.name,
            character.description,
            character.thumbnail,
            character.comics,
            character.series,
            character.stories,
            character.events
        )
    }

    private handleCharacters(response : any): Character[] {
        const characters: Character[] = [];
        response.data.results.forEach(element => {
            const character = new Character(
                element.id,
                element.name,
                element.description,
                element.thumbnail,
                element.comics,
                element.series,
                element.stories,
                element.events
            )
            characters.push(character);
        });

        return characters;
    }
}