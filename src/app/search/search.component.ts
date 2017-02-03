import { Component, OnInit } from '@angular/core';

import { Player } from '../player';

import { PlayerSearchService } from '../services/player-search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

allPlayers: Player[];
  filtered: Player[];

  constructor(private _search: PlayerSearchService) { }

  ngOnInit() {
    this._search.getAllPlayers()
      .subscribe(
        players => this.allPlayers = this.filtered = players
      )
  }


  search(term:string){
    //console.log(term);
    term = term.toLowerCase();
    for(let player of this.allPlayers){
      player.first_name = player.first_name.toLowerCase();
    }
    this.filtered = this.allPlayers.filter(player => player.first_name.includes(term));
    console.log(this.filtered);
  }


}
