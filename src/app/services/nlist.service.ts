import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class NlistService{
  http:any;
  baseUrl: String;
  postData:any;

  constructor(http:Http) {
    this.http = http;
    this.baseUrl = 'http://www.x-stress.se/niktest/';
   
  }

  getPosts() {
    return this.http.get(this.baseUrl + "get-list-api.php")
//      .map(res => res);
      .map(res => res.json());
  }

  deletePost(id, uuid) {
    return this.http.get(this.baseUrl + "delete.php?id=" + id +
                           "&Deleter=" + uuid);
  }

  addPost(newText, latitude, longitude, uuid) {

//    this.postData = {
//      Message: newText
//    };

//    console.log("Adding: " + newText);
//    console.log("Adding post: " + this.postData);
//    console.log("---");
    

    return this.http.get(this.baseUrl + "add-get.php?Message=" + newText +
                           "&Lat=" + latitude +
                           "&Long=" + longitude +
                           "&Creator=" + uuid);
  }


}
