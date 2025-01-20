import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{

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

  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private matSnackBar:MatSnackBar,
    private dialog:MatDialog
  ){}


  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroById(id))
      ).subscribe(
        hero => {
          if (!hero) return this.router.navigateByUrl('/');
          this.heroForm.reset(hero)
          return;
        }
      )
  }

  onSubmit():void {

    if (this.heroForm.invalid) return;

    if (this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackBar(`${hero.superhero} updated!`)
      })
      return;
    }
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero =>{
        this.router.navigate(['heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} created!`)
      })

    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });

  }
  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  showSnackBar (message:string){
    this.matSnackBar.open (message, 'done', {duration:2500})
  }

  onDeleteHero(){
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: this.heroForm.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log({ result });
    });
  }


}
