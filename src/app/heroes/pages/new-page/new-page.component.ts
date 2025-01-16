import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../hero.service';

@Component({
  selector: 'app-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true } ),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  constructor( private heroesService:HeroesService){}

  onSubmit():void {

    if (this.heroForm.invalid) return;

    if (this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {})
      return;
    }
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero =>{})

    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });

  }
  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }


}
