import { Component } from '@angular/core';
import {NlistService} from '../../app/services/nlist.service';
import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native';
import { BarcodeScanner } from 'ionic-native';
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

/*
    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
*/

    let watch = Geolocation.watchPosition();
    watch.subscribe((data) => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;

        this.getPosts();  // Both to update vectors and poll for changed list
    });

  }

  ngOnInit() {
    this.getPosts();
  }

  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.sendItem("Scanned: " + barcodeData.text);
    }, (err) => {
      alert("Scan err");
      alert(err);
    });
  }



  getPosts (){ 
    this.nlistService.getPosts().subscribe(response => {

 //       console.log(" - - - - - -");
 //       console.log(response);
 //       console.log(" - - - - - -");
        this.items = response.children;

      console.log("calc vec...");

      
      for(let item of this.items) {
        var xd = (this.longitude - item.longitude) * 59000.0; // to meter E/W at ca 58 deg N
        var yd = (this.latitude - item.latitude) * 111320.0;  // to meter N/S
        var dist = Math.sqrt(xd **2 + yd **2);
        var dir = Math.atan2(xd, yd) * 360 / (2 * Math.PI);
        if (dir < 0) { dir = dir + 180; };

//        console.log("dist0  " + item.latitude + " - " + item.longitude+ " xd " + xd);
//        console.log("dist1  id:" + item.id + "dist:" + dist+ "dir:" + dir);

        item.dist =  dist.toFixed(0);
        item.dir = dir.toFixed(0);
      };  

    });
  }


  addItem()  {
    this.sendItem(this.newPost);
  }
  
  sendItem(newText)  {
      console.log("Add: " + newText + "...");


      this.nlistService.addPost(newText, this.latitude, this.longitude, this.uuid).subscribe(response => {
        console.log("Add: ReGet to referesh list");

        console.log(" - - - ADD response - - -");
        console.log(response);
        console.log(" - - - - - -");

        this.getPosts ();
      });

  }

  deleteItem(id)  {

      this.nlistService.deletePost(id, this.uuid).subscribe(response => {

        this.getPosts (); // get the updated list from server
      });

  }


}
