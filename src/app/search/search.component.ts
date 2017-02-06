import { Component, OnInit } from '@angular/core';

import { Player } from '../player';

import { PlayerDataService } from '../services/player-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

allPlayers: Player[];
  filtered: Player[];
  query: string;

  constructor(
    private _search: PlayerDataService,
    private _router: Router) { }


  ngOnInit(){
    this._search.getPlayers()
      .subscribe(
        players => this.allPlayers = this.filtered = players
      );
  }


  // search(term: string) {

  //   for(let player of this.filtered){
  //     player.first_name = player.first_name.toLowerCase();
  //   }
  //   this.filtered = this.allPlayers.filter(player => player.first_name.includes(term.toLowerCase()));
  // }

  search(term: string){
    this.query = term;
    let link = ['/results', this.query];
    this._router.navigate(link);
  }

  
}
