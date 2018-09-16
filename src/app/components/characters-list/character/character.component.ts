import { Component, OnInit } from '@angular/core';

import { MarvelService } from '../../../services/marvel.service';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../../models/character.model';
import { EventsImages } from '../../../models/eventsImages.model';
 
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  private id : string;
  private character: Character;
  private eventImages: EventsImages[] = [];

  constructor(
    private marvelService: MarvelService,
    private router: ActivatedRoute
  ) {
    
    this.router.params.subscribe(params => this.id = params.id)

   }

  ngOnInit() {
    this.loadCharacter();
  }

  loadCharacter() {
      this.marvelService.getCharacterById(this.id)
      .subscribe(
        (character: Character) => {
          this.character = character,
          this.loadCharacterEventsImages(character.events.items);
        }
      )
  }

  loadCharacterEventsImages(listOfEvents: any) {
    this.marvelService.getEventImgList(listOfEvents)
    .subscribe(data=>{
      this.eventImages = data
    });
  }

}
