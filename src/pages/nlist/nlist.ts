import { Component } from '@angular/core';
import {NlistService} from '../../app/services/nlist.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'nlist',
  templateUrl: 'nlist.html'
})

export class NlistPage {
  items: any;

  constructor(public navCtrl: NavController, private nlistService:NlistService) {

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts (){
      this.nlistService.getPosts().subscribe(response => {
        console.log(" - - - - - -");
        console.log(response);
        console.log(" - - - - - -");
        this.items = response.children;
      });
  }


}
