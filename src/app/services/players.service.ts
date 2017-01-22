import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Player} from '../player';
import 'rxjs/Rx';

@Injectable()
export class PlayersService {

    constructor(private http: Http) {}

    getPlayers() {
        return this.http.get('player.json')
                    .toPromise()
                    .then(res => <Player[]> res.json().data)
                    .then(data => { return data; });
    }
}
