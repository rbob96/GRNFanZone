import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  query: string;
  termSubject: Subject<any>;

  constructor(
    private _router: Router) { }

  search = (term: string) => {
    const link = ['/results', term];
    this._router.navigate(link);
  }
}
