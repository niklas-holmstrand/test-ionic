import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NlistService{
  http:any;
  baseUrl: String;

  constructor(http:Http) {
    this.http = http;
    this.baseUrl = 'http://www.x-stress.se/niktest/get-list-api.php';
  }

  getPosts() {
    return this.http.get(this.baseUrl)
//      .map(res => res);
      .map(res => res.json());
  }

}
