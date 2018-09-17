import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../../../services/marvel.service';
import { Character } from '../../../models/character.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private characters: Array<Character> = [];
  private loading: boolean = false;

  constructor(private route: ActivatedRoute, private marvelService: MarvelService) {
    this.route.params.subscribe(params => {
      if (params['prefix']) {
        this.onSearch(params.prefix)
      }
    })
  }

  ngOnInit() {
  }

  onSearch(prefix: string) {
    this.loading = true;
    this.marvelService.getCharacters(undefined, prefix)
    .subscribe(
      characters => {
        this.characters = characters;
        if (this.characters.length >= 0){
          this.loading = false;
        }
      },
      error => {
        console.log('Something wrong')
      }
    )
  }

}
