import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');

  public heroes: Hero[] = [];

  public seletecHero?: Hero;

  constructor ( private heroesService:HeroesService){

  }

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);

  }

  onSelectedOption(event:MatAutocompleteSelectedEvent){
    if (!event.option.value){
      this.seletecHero = undefined
      return
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue ( hero.superhero);
    this.seletecHero = hero;

  }



}
