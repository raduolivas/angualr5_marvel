import { Component, OnInit } from '@angular/core';

import { Character } from '../../models/character.model';
import { Marvelervice } from '../../services/marvel.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  private characters: Array<Character> = [];

  constructor(private marvelService : Marvelervice, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.marvelService.getCharacters()
      .subscribe(
        data => {
          console.log(data);
          this.characters = data;
        },
        error => console.log('Something wrong'),
      )
  }

}
