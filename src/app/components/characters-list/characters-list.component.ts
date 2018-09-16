import { Component, OnInit } from '@angular/core';

import { Character } from '../../models/character.model';
import { MarvelService } from '../../services/marvel.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  private characters: Array<Character> = [];

  constructor(private marvelService : MarvelService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.marvelService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
        error => console.log('Something wrong'),
      )
  }

}
