import { Component, OnInit } from '@angular/core';

import { Player } from '../player';

import { PlayerDataService } from '../services/player-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent{

  query:string;

  constructor(
    private _search: PlayerDataService,
    private _router: Router) { }

  search(term: string){
    this.query = term;
    const link = ['/results', this.query];
    this._router.navigate(link);
  }
}
