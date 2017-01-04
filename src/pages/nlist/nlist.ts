import { Component } from '@angular/core';
import {NlistService} from '../../app/services/nlist.service';
import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'nlist',
  templateUrl: 'nlist.html'
})

export class NlistPage {
  items: any;
  newPost: any;
  uuid: any;
  latitude: any;
  longitude: any;

  constructor(public navCtrl: NavController, private nlistService:NlistService) {
//    this.newPost = "(enter text)";
    this.uuid = Device.uuid;

    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

//	  alert("lat" + this.latitude);
//	  alert("long" + this.longitude);
//	  alert("uuid" + this.uuid);

      this.nlistService.addPost(this.newPost, this.latitude, this.longitude, this.uuid).subscribe(response => {
        console.log("Add: ReGet to referesh list");

        console.log(" - - - ADD response - - -");
        console.log(response);
        console.log(" - - - - - -");

        this.getPosts ();
      });

  }

  deleteItem(id)  {
//      console.log("Delete:" + id + "...");

      this.nlistService.deletePost(id, this.uuid).subscribe(response => {
//        console.log(" - - - Delete - - -");
//        console.log(response);
//        console.log(" - - - - - -");
        console.log("ReGet to referesh list");
        this.getPosts ();
      });

  }


}
