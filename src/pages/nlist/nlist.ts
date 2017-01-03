import { Component } from '@angular/core';
import {NlistService} from '../../app/services/nlist.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'nlist',
  templateUrl: 'nlist.html'
})

export class NlistPage {
  items: any;
  newPost: any;

  constructor(public navCtrl: NavController, private nlistService:NlistService) {
    this.newPost = "(enter text)";
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts (){
      this.nlistService.getPosts().subscribe(response => {
 //       console.log(" - - - - - -");
 //       console.log(response);
 //       console.log(" - - - - - -");
        this.items = response.children;
      });
  }

  addItem()  {
      console.log("Add: " + this.newPost + "...");


      this.nlistService.addPost(this.newPost).subscribe(response => {
        console.log("Add: ReGet to referesh list");

        console.log(" - - - ADD response - - -");
        console.log(response);
        console.log(" - - - - - -");

        this.getPosts ();
      });

  }

  deleteItem(id)  {
//      console.log("Delete:" + id + "...");

      this.nlistService.deletePost(id).subscribe(response => {
//        console.log(" - - - Delete - - -");
//        console.log(response);
//        console.log(" - - - - - -");
        console.log("ReGet to referesh list");
        this.getPosts ();
      });

  }


}
